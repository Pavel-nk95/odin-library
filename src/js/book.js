class Book {
  constructor(id, book, author, pages, status) {
    this.id = id;
    this.book = book;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.book;
  }

  getAuthor() {
    return this.author;
  }

  getPages() {
    return this.pages;
  }

  getStatus() {
    return this.status;
  }

  setStatus(value) {
    this.status = value;
  }

  toggleStatus() {
    this.setStatus(this.getStatus() === 'read' ? 'unread' : 'read');
    return this.status;
  }
}

export default Book;
