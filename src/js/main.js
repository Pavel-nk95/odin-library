'use strict';

const form = document.querySelector('.form');
const tbody = document.querySelector('.tbody');

let myLibrary = [];

if (JSON.parse(localStorage.getItem('books')).length > 0) {
  myLibrary = [...JSON.parse(localStorage.getItem('books'))];
  renderBooks(myLibrary);
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  addBookToLibrary(event.target);
});

function deleteBook(id) {
  const newMyLibrary = myLibrary.filter((item) => item.id !== String(id));
  myLibrary = newMyLibrary;
  renderBooks(myLibrary);
}

function toggleStatus(status, id) {
  const newStatus = status.value === 'unread' ? 'read' : 'unread';
  const newMyLibrary = myLibrary.map((item) => {
    if (item.id === String(id)) {
      item.status = newStatus;
    }
    return item;
  });
  myLibrary = newMyLibrary;
  renderBooks(myLibrary);
}

function Book() {
  // the constructor...
}

function renderBooks(library) {
  localStorage.setItem('books', JSON.stringify(library));
  tbody.innerHTML = '';
  library.forEach((data) => {
    const { id, book, author, pages, status } = data;
    tbody.insertAdjacentHTML(
      'beforeend',
      `<tr class="book" data-id="${id}">
                <td>${book}</td>
                <td>${author}</td>
                <td>${pages}</td>
                <td><button class="button status-btn" onclick="toggleStatus(${status}, ${id})">${status}</button></td>
                <td><button class="button button--danger" onclick="deleteBook(${id})">Delete</button></td>
              </tr>`,
    );
  });
}

function addBookToLibrary(target) {
  const data = new FormData(target);
  data.append('id', myLibrary.length + 1);
  const newBook = {};
  for (let [name, value] of data) {
    newBook[name] = value;
  }
  myLibrary.push(newBook);
  renderBooks(myLibrary);
  target.reset();
}
