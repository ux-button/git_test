const myLibrary = [];

function Book(title, author, pages, read=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read||'not read yet'}`
    }
}

document.querySelector('#add-book').addEventListener('click', () {
    addBookToLibrary();
})

function addBookToLibrary() {
    const title = prompt('What the title? ');
    const author = prompt('Who the author? ');
    const pages = prompt('How many pages? ');

    // Create object with Book constructor
    myLibrary.push(new Book(title, author, pages))
}

for (let book of myLibrary) {
    console.log(book.info())
}