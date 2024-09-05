const express = require("express");
const router = express.Router();
const BooksController = require('../controllers/books.controller')

// Books
router.get('/books', BooksController.getAllBooks);
router.post('/book/create', BooksController.createBook);
router.get('/book/:id', BooksController.getBookById);
router.put('/book/update/:id', BooksController.updateBook);
router.delete('/book/delete/:id', BooksController.deleteBook);

module.exports = router;