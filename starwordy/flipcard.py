from cs50 import SQL
import random

db = SQL("sqlite:///starword.db")

class Group:
    def __init__(self, id, name):
        self.id = id
        self.name = name


    @classmethod
    def new(cls, name, user):
        name = name.strip().lower().capitalize()
        db.execute('INSERT INTO groups (user_id, group_name) VALUES (?, ?)', user, name)
        rows = db.execute('SELECT id FROM groups WHERE user_id = ?',
                   user)
        return cls(rows[0]['id'], name)


    @classmethod
    def load(cls, user_id):
        rows = db.execute('SELECT id, group_name FROM groups WHERE user_id = ?', user_id)
        groups = list()
        for row in rows:
            group = cls(row['id'], row['group_name'])
            groups.append(group)
        return groups


    @classmethod
    def load_group(cls, name, user):
        rows = db.execute('SELECT id FROM groups WHERE user_id = ? AND group_name = ?', user, name)
        if len(rows) == 0:
            return None
        return cls(rows[0]['id'], name)


    @classmethod
    def delete(cls, group_id):
        # Delete all words related to group
        db.execute('DELETE FROM words WHERE group_id = ?', group_id)

        # Delete group
        db.execute('DELETE FROM groups WHERE id = ?', group_id)


class Flipcard:
    def __init__(self, word_id, group_id, word, definition, curve):
        self.word_id = word_id
        self.group_id = group_id
        self.word = word
        self.definition = definition
        self.curve = curve


    @classmethod
    def new(cls, group_id, word, definition):
        db.execute('INSERT INTO words (group_id, word, definition, curve) VALUES (?, ?, ?, 0)',
                   group_id, word, definition)
        rows = db.execute('SELECT * FROM words WHERE group_id = ? AND word = ? AND definition = ?',
                          group_id, word, definition)
        return cls(rows[0]['id'], rows[0]['group_id'], rows[0]['word'], rows[0]['definition'], rows[0]['curve'])


    # Load all flipcard of the group
    @classmethod
    def load(cls, group_id):
        rows = db.execute('SELECT * FROM words WHERE group_id = ?', group_id)
        flipcards = list()
        for row in rows:
            flipcard = cls(row['id'], group_id, row['word'], row['definition'], row['curve'])
            flipcards.append(flipcard)
        return flipcards


    # Load n random cards from group
    @classmethod
    def load_random(cls, group_id, quantity):
        rows = db.execute('SELECT * FROM words WHERE group_id = ?', group_id)
        flipcards = list()
        for row in rows:
            flipcard = cls(row['id'], group_id, row['word'], row['definition'], row['curve'])
            flipcards.append(flipcard)
        random.shuffle(flipcards)
        return flipcards[:quantity]


    @classmethod
    def delete(cls, id):
        db.execute('DELETE FROM words WHERE id = ?', id)


    def increase(self):
        self.curve += 1


    def decrease(self):
        if self.curve != 0:
            self.curve -= 1


class User:
    def __init__(self, id, username, groups, flipcards):
        self.id = id
        self.username = username
        self.groups = groups
        self.flipcards = flipcards

    @classmethod
    def get(cls, id):
        # Load all users groups
        all_groups = Group.load(id)

        # Load all users flipcards
        all_flipcards = []
        for group in all_groups:
            flipcards = Flipcard.load(group.id)
            for flipcard in flipcards:
                all_flipcards.append(flipcard)

        # Load username
        username = db.execute('SELECT user_id FROM users WHERE id = ?', id)
        username = str(username[0]['user_id']).capitalize()

        # Return user object
        return cls(id, username, all_groups, all_flipcards)

