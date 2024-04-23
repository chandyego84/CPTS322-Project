// components/UserBookList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

function UserBookList({ loggedInUsername }) {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/books/user/${loggedInUsername}`)
      .then((res) => {
        setUserBooks(res.data);
      })
      .catch((err) => {
        console.log('Error fetching user books:', err);
      });
  }, [loggedInUsername]);

  const bookList =
    userBooks.length === 0
      ? 'You have no books added!'
      : userBooks.map((book, index) => <BookCard book={book} key={index} />);

  return (
    <div className='ShowBookList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>{loggedInUsername} Book List</h2>
          </div>

          <div className='col-md-11'>
          <Link to='/' className='btn btn-outline-warning float-left'>
              Return to Library
            </Link>
            <Link to='/login' className='btn btn-outline-success float-right'>
              Logout
            </Link>
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

export default UserBookList;
