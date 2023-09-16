// Your JS code goes here
var newBookForm = document.getElementById("new_book_submit");
var bookListBody = document.getElementById("add_book");

let books = [
    {
        "id": 1,
        "name": "Refactoring",
        "author": "Martin Fowler",
        "topic": "Programming"
    },
    {
        "id": 2,
        "name": "Designing Data-intensive Applications",
        "author": "Martin Kleppmann",
        "topic": "Database"
    },
    {
        "id": 3,
        "name": "The Phoenix Project",
        "author": "Gene Kim",
        "topic": "Devops"
    },
]

function createDataToLocalStorageIfExits() {
    let bookExits = localStorage.getItem("book")
    if (bookExits === null || JSON.parse(bookExits).length <= 0) {
        localStorage.setItem("book", JSON.stringify(books));
    }
}

createDataToLocalStorageIfExits();

function getLocalStorageData() {
    let books = JSON.parse(localStorage.getItem("book"));
    for (let book of books) {
        let newBook = document.createElement("tr");
        newBook.setAttribute("id", book.id)
        let html = `    
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.topic}</td>
            <td class="delete" onclick="openDeleteModel(${book.id}, '${book.name}')">
                  Delete
                </td>
            `
        newBook.innerHTML = html
        bookListBody.appendChild(newBook)
    }
}

getLocalStorageData()

newBookForm.addEventListener("submit", e => {
    e.preventDefault();
    const {
        elements
    } = newBookForm
    const topicId = document.getElementById("topic")
    const topicText = topicId.options[topicId.selectedIndex].text;
    let updateBooks = JSON.parse(localStorage.getItem("book"));
    const maxId = Math.max(...updateBooks.map(book => book.id))
    let newBookObj = {
        id: maxId + 1,
        name: elements.name.value,
        author: elements.author.value,
        topic: topicText
    }
    updateBooks.push(newBookObj);
    localStorage.setItem("book", JSON.stringify(updateBooks));
    let newBook = document.createElement("tr");
    newBook.setAttribute("id", maxId + 1);
    let html = `    
    <td>${elements.name.value}</td>
    <td>${elements.author.value}</td>
    <td>${topicText}</td>
    <td class="delete" onclick="openDeleteModel(${maxId + 1}, '${elements.name.value}')">
                  Delete
                </td>
    `
    newBook.innerHTML = html
    bookListBody.appendChild(newBook)
    addBookModal.style.display = "none";

})

function remove_book(id) {
    let books = JSON.parse(localStorage.getItem("book"));
    const index = books.findIndex(book => book.id === Number(id));
    console.log(id);
    if (index !== -1) {
        books.splice(index, 1);
        localStorage.setItem("book", JSON.stringify(books));
        document.getElementById(id).remove();
    }
}

function search() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("book_list");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

var addBookOpenModel = document.getElementById("add_book_open");
var addBookModal = document.getElementById("add_book_popup_box");
var addBookCloseModel = document.getElementById("add_book_close");

addBookOpenModel.onclick = function () {
    addBookModal.style.display = "block";
}

addBookCloseModel.onclick = function () {
    addBookModal.style.display = "none";
}


let deleteId = 0;
let deleteName = "";
let deleteModel = document.getElementById("delete_book_popup_box");
let deleteModelClose = document.getElementById("delete_book_close");

function openDeleteModel(id, name) {
    deleteId = id
    let bookNameHTML = document.getElementById("delete-name");
    bookNameHTML.innerHTML = name
    deleteModel.style.display = "block"
}

function confirmDelete() {
    let books = JSON.parse(localStorage.getItem("book"));
    const index = books.findIndex(book => book.id === Number(id));
    console.log(id);
    if (index !== -1) {
        books.splice(index, 1);
        localStorage.setItem("book", JSON.stringify(books));
        document.getElementById(id).remove();
        deleteModel.style.display = "none"
    }
}

function cancelDelete() {
    deleteModel.style.display = "none";
}

deleteModelClose.onclick = function() {
    deleteModel.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == addBookModal || event.target == deleteModel) {
        addBookModal.style.display = "none";
        deleteModel.style.display = "none";
    }
};