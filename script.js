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
    if (allRequiredFieldsFilled()) {
        let title = document.getElementById("title").value;
        let author = document.getElementById("author").value;
        let pages = document.getElementById("pages").value;
        let read = document.getElementById("read-yes").checked;
    
        newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        writeToStorage();

        return true;
    } else {
        alert("Please fill all required fields properly!" 
        + (pagesIsInteger() ? "" : " Number of pages must an integer number!")
        + (authorIsNumber() ? " Name of the author should not be a number!" : ""));
        return false;
    }

}

function displayLibrary(library) {
    readFromStorage();
    for (let index = 0; index < myLibrary.length; index++) {
        const book = myLibrary[index];
        row = library_table.insertRow(-1);
        row.setAttribute("id", index); 

        cell = row.insertCell(0);
        let text = document.createTextNode(book.title);
        cell.appendChild(text);

        cell = row.insertCell(1);
        text = document.createTextNode(book.author);
        cell.appendChild(text);

        cell = row.insertCell(2);
        text = document.createTextNode(book.pages);
        cell.appendChild(text);

        cell = row.insertCell(3);
        button = document.createElement("button");
        button.setAttribute("class", "read-button");
        button.textContent = book.read ? "Yes" : "No";
        button.style.width = "100%";
        button.style.height = "100%";
        button.addEventListener("click", function () {
                changeReadStatus(index);
            })
        cell.appendChild(button);

        cell = row.insertCell(4);
        button = document.createElement("button");
        button.setAttribute("class", "delete");
        button.textContent = "X";
        button.style.width = "25px";
        button.style.height = "25px";
        button.style.color = "red";
        button.addEventListener("click", function () {
                deleteRow(index);
            })
        cell.appendChild(button);
    }
}

function clearLibraryTable() {
    rows = library_table.getElementsByTagName("tr");
    while (row = rows[1]) {
        row.parentNode.removeChild(row);
      }
}

function deleteRow(index) {
    deleteBook(index);
    clearLibraryTable();
    displayLibrary();
}

function deleteBook(index) {
    myLibrary.splice(index, 1)
    writeToStorage();
}

function deleteLibrary() {
    myLibrary.length = 0;
    writeToStorage();
}

function changeReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    writeToStorage();
    clearLibraryTable();
    displayLibrary();
}

function allRequiredFieldsFilled () {
    if ((read_yes.checked || read_no.checked) && form_title.value.length > 0 
    && form_author.value.length > 0 && form_pages.value.length > 0 && pagesIsInteger() && !authorIsNumber()) return true;
    else return false;
}

function pagesIsInteger () {
    if(Number.isInteger(Number(form_pages.value))) return true;
    else return false;
}

function authorIsNumber () {
    if (!isNaN(form_author.value) && form_author.value.length > 0) return true;
    else return false;
}

function writeToStorage() {
    localStorage.library = JSON.stringify(myLibrary);
}

function readFromStorage() {
    if(localStorage.library) myLibrary = JSON.parse(localStorage.library);
}

const button_new_book = document.getElementById("new-book");
const div_add_form = document.getElementById("add-form");
const button_add = document.getElementById("add");
const button_clear = document.getElementById("clear-library-table");
const button_cancel = document.getElementById("cancel");
const library_table = document.getElementById("library-table").getElementsByTagName("tbody")[0];
form_title = document.getElementById("title");
form_author = document.getElementById("author");
form_pages = document.getElementById("pages");
const read_yes = document.getElementById("read-yes");
const read_no = document.getElementById("read-no");

button_new_book.addEventListener("click", function () {
    div_add_form.style.display="block";
    button_new_book.style.display="none";
})

button_add.addEventListener("click", function() {
    if (addBookToLibrary()) {
        clearLibraryTable();
        displayLibrary();    
        div_add_form.style.display="none";
        button_new_book.style.display="block";
        button_new_book.style.alignContent="center";
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#pages").value = '';
    }
})

button_clear.addEventListener("click", function() {
    deleteLibrary();
    clearLibraryTable();
})

button_cancel.addEventListener("click", function () {
    div_add_form.style.display="none";
    button_new_book.style.display="block";
    button_new_book.style.alignContent="center";
})

new_Book = new Book("Światło Jedi", "Charles Soule", 480, true);
myLibrary.push(new_Book);
new_Book = new Book("Realizm kapitalistyczny. Czy nie ma alternatywy?", "Mark Fisher", 174, true);
myLibrary.push(new_Book);
new_Book = new Book("W ciemność", "Claudia Gray", 512, true);
myLibrary.push(new_Book);
new_Book = new Book("Burza nadciąga", "Cavan Scott", 416, false);
myLibrary.push(new_Book);
new_Book = new Book("Akademia Pana Kleksa", "Jan Brzechwa", 136, true);
myLibrary.push(new_Book);
new_Book = new Book("Mikroekonomia", "Hal Varian", 792, false);
myLibrary.push(new_Book);


displayLibrary(myLibrary);