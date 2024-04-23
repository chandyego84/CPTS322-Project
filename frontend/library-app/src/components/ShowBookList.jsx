import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import SignUp from './SignUp';
import LogIn from './LogIn';

function ShowBookList({ loggedInUsername }) {
  const [books, setBooks] = useState([]);
  const welcomeMessage = loggedInUsername ? `Welcome ${loggedInUsername} to the library` : 'Welcome to the library';

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/books')
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowBookList');
      });
  }, []);

  const bookList =
    books.length === 0
      ? 'There are no books in the library!'
      : books.map((book, k) => <BookCard book={book} key={k} />);

  return (
    <div className='ShowBookList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>{welcomeMessage}</h2>
          </div>

          <div className='col-md-11'>
            <div className="link-container">
              <Link
                to='/create-book'
                className='btn btn-outline-warning'
              >
                + Add New Book
              </Link>
              <Link to='/user-book-list' className='btn btn-outline-info'> {/* Button to navigate to user's book list */}
                My Checked Out Books
              </Link>
              <Link to='/signup' className='btn btn-outline-primary'>
                Sign Up
              </Link>
              <Link to='/login' className='btn btn-outline-success'>
                Login
              </Link>
            </div>
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className='list'>{bookList}</div>
      </div>
    </div>
  );
}

export default ShowBookList;
