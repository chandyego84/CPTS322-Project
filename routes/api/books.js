const axios = require('axios');
const express = require('express');
const router = express.Router();
require('dotenv').config();

// load book model
const Book = require('../../models/Book');

const googleBooksAPIKey = process.env.VITE_GOOGLE_BOOKS_API_KEY;

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
* @route  GET api/books/user/:username
* @desc Get books added by a specific user
* @access public
*/
router.get('/user/:username', (req, res) => {
    const username = req.params.username;
    Book.find({ checkedOutBy: username })
        .then(books => res.json(books))
        .catch(err => res.status(404).json({ noBooksFound: "No books found for this user" }));
});

/*
* @route  POST api/books
* @desc Add/save a book 
* @access public
*/
router.post('/', async (req, res) => {
    try {
        let bookData;
        if (req.body.isbn) {
            // If ISBN is provided, search by ISBN
            const googleBooksAPIUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${req.body.isbn}&key=${googleBooksAPIKey}`;
            const response = await axios.get(googleBooksAPIUrl);

            // Check if the response is valid and contains items
            if (response.data && response.data.items && response.data.items.length > 0) {
                bookData = response.data.items[0].volumeInfo;
            } else {
                throw new Error('Book not found or invalid response from Google Books API');
            }
        } else {
            // If ISBN is not provided, search by title and author
            const googleBooksAPIUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
                req.body.title
            )}+inauthor:${encodeURIComponent(req.body.author)}&key=${googleBooksAPIKey}`;
            const response = await axios.get(googleBooksAPIUrl);

            // Check if the response is valid and contains items
            if (response.data && response.data.items && response.data.items.length > 0) {
                bookData = response.data.items[0].volumeInfo;
            } else {
                throw new Error('Book not found or invalid response from Google Books API');
            }
        }

        // Create a new Book instance with fetched information
        const newBook = new Book({
            title: bookData.title,
            isbn: bookData.industryIdentifiers ? bookData.industryIdentifiers[0].identifier : '',
            author: bookData.authors ? bookData.authors.join(', ') : '',
            description: bookData.description,
            published_date: bookData.publishedDate,
            publisher: bookData.publisher,
            imageLink: bookData.imageLinks.smallThumbnail,
        });

        // Save the book to the database
        const savedBook = await newBook.save();
        res.json({ msg: 'Book added successfully', book: savedBook });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(400).json({ error: error.message || 'Unable to add this book' });
    }
});


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
* @route  PUT api/books/:id/checkout
* @desc User checks out a book by book id and user id
* @access public
*/

router.put('/:id/checkout', async (req, res) => {
    try {
        const bookId = req.params.id;
        const username = req.body.username;

        // Update the book's checkedOutBy field with the user's ID
        const updatedBook = await Book.findByIdAndUpdate(bookId, { checkedOutBy: username }, { new: true });

        res.json({ msg: 'Book checked out successfully', book: updatedBook });
    } catch (error) {
        console.error('Error checking out book:', error);
        res.status(500).json({ error: 'Unable to check out this book' });
    }
});

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
