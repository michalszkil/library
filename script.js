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

        return true;
    } else {
        alert("Please fill all required fields properly!" 
        + (pagesIsInteger() ? "" : " Number of pages must an integer number!")
        + (authorIsNumber() ? " Name of the author should not be a number!" : ""));
        return false;
    }

}

function displayLibrary(library) {
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
        text = document.createTextNode(book.read ? "Yes" : "No");
        cell.appendChild(text);

        cell = row.insertCell(4);
        // cell.style.display="flex";
        // cell.style.flexDirection="column";
        // cell.style.alignItems="center";
        button = document.createElement("button");
        button.setAttribute("class", "delete");
        button.addEventListener("click", function () {
                deleteRow(index);
            })
        cell.appendChild(button);
        
        cell = row.insertCell(5);
        // cell.style.display="flex";
        // cell.style.flexDirection="column";
        // cell.style.alignItems="center";
        button = document.createElement("button");
        button.setAttribute("class", "change-read-status");
        button.addEventListener("click", function () {
                changeReadStatus(index);
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
}

function deleteLibrary() {
    myLibrary.length = 0;
}

function changeReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
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

displayLibrary(myLibrary);