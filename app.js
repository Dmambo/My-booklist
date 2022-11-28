/* eslint-disable max-classes-per-file */
/* eslint-disable indent */
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const btnInput = document.getElementById('submit-btn');
const addedBooks = document.getElementById('added-book');

// Book class: represents a book
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}
// store class: handles storage
class Store {
   static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

   static removeBook(author) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.author === author) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}
// UI class: handle UI tasks

class UI {
    static displayBooks() {
        const storedBook = Store.getBooks();

        const books = storedBook;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#added-book');

        const row = document.createElement('tr');

        row.innerHTML = `
            ${book.title}
            ${book.author}
            <a href="#" class="delete">remove</a>`;
        list.appendChild(row);
    }
    
    static deleteBook(el) {
    if (el.classList.contains('delete')) {
        el.parentElement.remove();
    }

}

    static clearFields() {
    titleInput.value = '';
    authorInput.value = '';
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
btnInput.addEventListener('click', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = titleInput.value;
    const author = authorInput.value;

    // Validate
    if (title === '' || author === '') {
        alert('Please fill in all fields');
    } else {
        // Instatiate book
        const book = new Book(title, author);
        // Add Book to store
        Store.addBook(book);
        // Add Book to UI
        UI.addBookToList(book);
        // clear fields
        UI.clearFields();
    }
});

// Event: Remove a Book
addedBooks.addEventListener('click', (e) => {
    e.preventDefault();

    // Remove book from UI
    UI.deleteBook(e.target);

     // Remove book from store
     Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
