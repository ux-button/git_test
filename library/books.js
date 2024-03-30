const myLibrary = [];

const addBook = document.querySelector('#add-book');
const libraryBookshelf = document.querySelector('#bookshelf') 

function Book(title, author, pages, read=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read||'not read yet'}`
    }
}


function addBookToLibrary() {
    

    // Create object with Book constructor
    myLibrary.push(new Book(title, author, pages))
}


addBook.addEventListener('click', function() {
    const div = document.createElement("div");
    div.innerHTML = '<form>\
            <input name="title" placeholder="Title">\
            <input name="author" placeholder="Author">\
            <input name="pages" placeholder="pages" type="numeric">\
            <button id="save-book" type="submit">Save</button>\
        </form>';
    div.classList.add("add-book-form");
    libraryBookshelf.appendChild(div);
})
