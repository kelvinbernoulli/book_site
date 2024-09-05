const express = require("express");
const router = express.Router();
const BooksController = require('../controllers/books.controller')
const CommentsController = require('../controllers/comments.controller')

// Books
router.get('/books', BooksController.getAllBooks);
router.post('/book/create', BooksController.createBook);
router.get('/book/:id', BooksController.getBookById);
router.put('/book/update/:id', BooksController.updateBook);
router.delete('/book/delete/:id', BooksController.deleteBook);

// Books
router.get('/comments', CommentsController.allComments);
// router.post('/comments/create', CommentsController.createComments);
// router.get('/comments/:id', CommentsController.getCommentById);
// router.put('/comments/update/:id', CommentsController.updateComment);
// router.delete('/comments/delete/:id', CommentsController.deleteComment);

module.exports = router;