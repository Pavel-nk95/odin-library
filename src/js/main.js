import Book from './book.js';

const form = document.querySelector('.form');
const tbody = document.querySelector('.tbody');
const clearBtn = document.querySelector('.clear-btn');

let myLibrary = [];

form.addEventListener('submit', function (event) {
  event.preventDefault();
  addBookToLibrary(event.target);
  event.target.reset();
});

clearBtn.addEventListener('click', () => {
  localStorage.clear();
  myLibrary = [];
  renderBooks(myLibrary);
});

function deleteBook(id) {
  const newMyLibrary = myLibrary.filter((book) => book.getId() !== String(id));
  myLibrary = newMyLibrary;
  renderBooks(myLibrary);
}

function toggleStatus(status, id) {
  const newMyLibrary = myLibrary.map((book) => {
    if (book.getId() === String(id)) {
      book.setStatus(status);
    }
    return book;
  });
  myLibrary = newMyLibrary;
  renderBooks(myLibrary);
}

function renderBooks(library) {
  tbody.innerHTML = '';
  library.forEach((book) => {
    tbody.insertAdjacentHTML(
      'beforeend',
      `<tr class="book" data-id="${book.getId()}">
                <td>${book.getName()}</td>
                <td>${book.getAuthor()}</td>
                <td>${book.getPages()}</td>
                <td><button class="button status-btn">${book.getStatus()}</button></td>
                <td><button class="button button--danger delete-btn">Delete</button></td>
              </tr>`,
    );
    addListenersForBook(book);
  });
}

function addListenersForBook(book) {
  tbody
    .querySelector(`[data-id="${book.getId()}"] > td > .status-btn`)
    .addEventListener('click', () => {
      toggleStatus(book.toggleStatus(), book.getId());
    });
  tbody
    .querySelector(`[data-id="${book.getId()}"] > td > .delete-btn`)
    .addEventListener('click', () => {
      deleteBook(book.getId());
    });
}

function initApp() {
  const booksJSON = localStorage.getItem('books');
  if (booksJSON !== null) {
    myLibrary.push(
      ...JSON.parse(booksJSON).map(
        ({ id, book, author, pages, status }) => new Book(id, book, author, pages, status),
      ),
    );
    renderBooks(myLibrary);
  }
}

function addBookToLibrary(target) {
  const data = new FormData(target);
  data.append('id', myLibrary.length + 1);
  const newData = {};
  for (let [name, value] of data) {
    newData[name] = value;
  }
  const { id, book, author, pages, status } = newData;
  const newBook = new Book(id, book, author, pages, status);
  myLibrary.push(newBook);
  localStorage.setItem('books', JSON.stringify(myLibrary));
  renderBooks(myLibrary);
}

initApp();
