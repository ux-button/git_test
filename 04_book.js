function Book(title, author, pages, read=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read||'not read yet'}`
    }
}

const father = new Book('Father', 'James Cash', 134);
console.log(father.info())