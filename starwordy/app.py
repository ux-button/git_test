import os

from cs50 import SQL
from flask import Flask, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from flipcard import Flipcard, Group, User

from functools import wraps

app = Flask(__name__)

app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

db = SQL("sqlite:///starword.db")

correct = 0

# Login decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)

    return decorated_function


@app.after_request
def after_request(response):
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidte'
    response.headers['Expires'] = 0
    response.headers['Pragma'] = 'no-cache'
    return response


@app.route('/', methods=['GET', 'POST'])
@login_required
def index():
    if request.method == 'POST':
        if not request.form.get('group_name'):
            return render_template('error.html', error_type='Empty group name', error_message='Empty group name')
        Group.new(request.form.get('group_name'), session['user_id'])
        return redirect('/')
    else:
        groups = Group.load(session['user_id'])

        # Get all userdata
        userdata = User.get(session['user_id'])

        return render_template('index.html', groups=groups, userdata=userdata)


@app.route('/login', methods=['GET', 'POST'])
def login():
    # Forget any session
    session.clear()

    if request.method == 'POST':
        # Check username
        if not request.form.get('username'):
            return render_template('error.html', error_type='Empty username', error_message='Empty username')

        # Check password
        if not request.form.get('password'):
            return render_template('error.html', error_type='Empty password', error_message='Empty password')

        # Find user data
        rows = db.execute('SELECT * FROM users WHERE user_id = ?', request.form.get('username').lower())

        # Check user and password correctness
        if len(rows) != 1 or check_password_hash(rows[0]['password'], request.form.get('password')):
            return render_template('error.html', error_type='Log in failed', error_message='Wrong username or password')

        # Create session
        session['user_id'] = rows[0]['id']

        return redirect('/')

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Check username
        if not request.form.get('username'):
            return render_template('error.html', error_type='Empty username', error_message='Empty username')

        # Check password
        if not request.form.get('password'):
            return render_template('error.html', error_type='Empty password', error_message='Empty password')

        # Check unique user
        rows = db.execute('SELECT id FROM users WHERE user_id = ?', request.form.get('username').lower())
        if len(rows) != 0:
            return render_template('error.html', error_type='User exists', error_message='User already exists')

        # Save user in database
        hashed_password = generate_password_hash(request.form.get('password'))
        db.execute('INSERT INTO users (user_id, password) VALUES (?, ?)', request.form.get('username').lower(), hashed_password)

        return redirect('/')

    return render_template('register.html')


@app.route('/group/<group_name>', methods=['GET', 'POST'])
@login_required
def group(group_name):
    global correct
    correct = 0
    if request.method == 'POST':
        word = request.form.get('word')
        definition = request.form.get('definition')
        # Check empty fields
        if not word or not definition:
            return render_template('error.html', error_type='Empty flipcard', error_message='Empty word or definition')

        group = Group.load_group(group_name, session['user_id'])
        Flipcard.new(group.id, word, definition)

        return redirect(f'/group/{group_name}')
    else:
        group = Group.load_group(group_name, session['user_id'])
        flipcards = Flipcard.load(group.id)

        # Get all userdata
        userdata = User.get(session['user_id'])
        return render_template('group.html', group=group, flipcards=flipcards, userdata=userdata)


@app.route('/delete_flipcard', methods=['POST'])
@login_required
def delete_flipcard():
    Flipcard.delete(request.form.get('flipcard_id'))
    group_name = request.form.get('group_name')
    return redirect(f'/group/{group_name}')


@app.route('/delete_group', methods=['POST'])
@login_required
def delete_group():
    group = Group.load_group(request.form.get('group_name'), session['user_id'])
    Group.delete(group.id)
    return redirect('/')


@app.route('/answers', methods=['GET', 'POST'])
@login_required
def answers():
    if request.method == 'POST':
        global correct
        group = Group.load_group(request.form.get('group'), session['user_id'])
        counter = int(request.form.get('card'))

        # Get all userdata
        userdata = User.get(session['user_id'])

        # Load all flipcards from group
        flipcards = Flipcard.load(group.id)

        # Check end of group
        if counter > len(flipcards):
            if flipcards[-1].definition == request.form.get('option'):
                correct += 1
            return render_template('results.html', correct=correct, words=len(flipcards), userdata=userdata)

        flipcard = flipcards[counter - 2]

        if flipcard.definition == request.form.get('option'):
            correct += 1
            return render_template('answers.html', group=group, flipcard=flipcard, counter=counter, answer='true', userdata=userdata)
        else:
            return render_template('answers.html', group=group, flipcard=flipcard, counter=counter, answer='false', userdata=userdata)
    else:
        group = Group.load_group(request.args.get('group'), session['user_id'])
        counter = int(request.args.get('card'))

        # Check if group isn't belong to user
        if not group:
            return render_template('error.html', error_type='Group not exist', error_message=f'{group} not exist')

        # Load all flipcards from group
        flipcards = Flipcard.load(group.id)

        # Slice one object
        flipcard = flipcards[counter - 1]

        # Take other random three words from group
        options = Flipcard.load_random(group.id, 3)
        options.append(flipcard)

        counter += 1

        # Get all userdata
        userdata = User.get(session['user_id'])

        return render_template('answers.html', group=group, flipcard=flipcard,
                               counter=counter, options=options, userdata=userdata)
