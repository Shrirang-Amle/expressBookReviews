const express = require('express'); 
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6 (Register a new user) - Will actually go in auth_users.js normally,
// but if you need it here, you can leave as-is or move.
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

// Task 1: Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.send(JSON.stringify(books, null, 4));
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.send(JSON.stringify(books[isbn], null, 4));
  }
  return res.status(404).json({ message: "Book not found" });
});
  
// Task 3: Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let filteredBooks = [];

  Object.keys(books).forEach((key) => {
    if (books[key].author === author) {
      filteredBooks.push(books[key]);
    }
  });

  if (filteredBooks.length > 0) {
    return res.send(JSON.stringify(filteredBooks, null, 4));
  }
  return res.status(404).json({ message: "No books found for this author" });
});

// Task 4: Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();
    let filteredBooks = [];
  
    Object.keys(books).forEach((key) => {
      if (books[key].title.toLowerCase().includes(title)) {
        filteredBooks.push(books[key]);
      }
    });
  
    if (filteredBooks.length > 0) {
      return res.send(JSON.stringify(filteredBooks, null, 4));
    }
    return res.status(404).json({ message: "No books found with this title" });
});

// Task 5: Get book review by ISBN
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
  
    if (books[isbn]) {
      const reviews = books[isbn].reviews;
      if (reviews && Object.keys(reviews).length > 0) {
        return res.json(reviews);
      } else {
        return res.json({ message: "No reviews available for this book" });
      }
    }
  
    return res.status(404).json({ message: "Book not found" });
  });
  

module.exports.general = public_users;
