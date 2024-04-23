import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const BookCard = ({book}) => {

  return (
    <div className='card-container'>
      <img
        className="book-thumbnail"
        src={book.imageLink ? book.imageLink : 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d'}
        alt='Book Cover'
        height={200}
      />
      <div className='desc'>
        <h2>
          <Link to={`/show-book/${book._id}`}>{book.title}</Link>
        </h2>
        <b>{book.author}</b>
        <p>{book.description}</p>
      </div>
    </div>
  );
};

export default BookCard;
