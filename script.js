let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return(title + " by " + author + ", " + pages +
         " pages, " + (read ? "have read it" : "not read yet"));
    }
}

function addBookToLibrary() {
    let title = prompt("What's the title of the book?");
    console.log(title);
    let author = prompt("Who's the author?");
    let pages = prompt("How many pages?");
    let read = prompt("Have you read it already?");
}
// addBookToLibrary();
// theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
// console.log(theHobbit.info());