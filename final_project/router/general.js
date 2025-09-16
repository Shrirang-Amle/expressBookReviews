const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

// Task 10 – Get list of all books
public_users.get('/', async (req, res) => {
    try {
        // Simulate async call using Promise
        const allBooks = await new Promise((resolve, reject) => {
            if (books) resolve(books);
            else reject("No books found");
        });
        res.status(200).json(allBooks);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Task 11 – Get book details by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const book = await new Promise((resolve, reject) => {
            if (books[isbn]) resolve(books[isbn]);
            else reject("Book not found");
        });
        res.status(200).json(book);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// Task 12 – Get book details by author
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author.toLowerCase();
    try {
        const result = await new Promise((resolve, reject) => {
            const bookList = Object.values(books).filter(b => b.author.toLowerCase() === author);
            if (bookList.length > 0) resolve(bookList);
            else reject("No books found for this author");
        });
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// Task 13 – Get book details by title
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title.toLowerCase();
    try {
        const result = await new Promise((resolve, reject) => {
            const bookList = Object.values(books).filter(b => b.title.toLowerCase() === title);
            if (bookList.length > 0) resolve(bookList);
            else reject("No books found with this title");
        });
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

module.exports.general = public_users;
