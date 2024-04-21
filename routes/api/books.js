const express = require('express');
const router = express.Router();

// load book model
const Book = require('../../models/Book');

/* 
* @route GET api/books/test
* @desc Test books route
* @access public
*/
router.get('/test', (req, res) => res.send('book route testing'));

/*
* @route  GET api/books
* @desc Get all books
* @access public
*/
router.get('/', (req, res) => {
    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status(404).json({ noBooksFound: "No books found" }));
})

/*
* @route  GET api/books/:id
* @desc Get a book by id
* @access public
*/
router.get('/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(book => res.json(book))
        .catch(err => res.status(404).json({ noBookFound: "No book found" }));
})

/*
* @route  POST api/books
* @desc Add/save a book 
* @access public
*/
router.post('/', (req, res) => {
    Book.create(req.body)
        .then(book => res.json({  msg: "Book added sucessfully" }))
        .catch(err => res.status(400).json({ noBookFound: "Unable to add this book" }));
})


/*
* @route  PUT api/books/:id
* @desc Update a book by id
* @access public
*/
router.put('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
        .then(book => res.json({ msg: "Updated book sucessfully" }))
        .catch(err => res.status(404).json({ noBookFound: "Unable to update book" }));
})

/*
* @route  DELETE api/books/:id
* @desc Delete a book by id
* @access public
*/
router.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(book => res.json({ msg: "Deleted book sucessfully" }))
        .catch(err => res.status(404).json({ noBookFound: "Unable to delete book" }));
})

module.exports = router;
