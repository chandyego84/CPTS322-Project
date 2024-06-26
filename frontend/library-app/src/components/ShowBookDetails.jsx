import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function ShowBookDetails({ loggedInUsername, onLogout }) {
  const [book, setBook] = useState({});
  const [isBookAvailableForCheckout, setIsBookAvailableForCheckout] = useState(false);
  const [isUserAbleToReturn, setIsUserAbleToReturn] = useState(false);
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowBookDetails');
      });
  }, [id]);

  useEffect(() => {
    console.log('book prop or currently logged in user has updated');
    const isBookAvailable = !book.checkedOutBy || book.checkedOutBy === '';
    const isUserAbleToReturn = book.checkedOutBy === loggedInUsername;
    setIsBookAvailableForCheckout(isBookAvailable);
    setIsUserAbleToReturn(isUserAbleToReturn);
  }, [book, loggedInUsername]);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8082/api/books/${id}`)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log('Error form ShowBookDetails_deleteClick');
      });
  };

  const onCheckOutClick = async (id) => {
    try {
      const res = await axios.put(`http://localhost:8082/api/books/${id}/checkout`, {
        username: loggedInUsername // Pass the ID of the logged-in user
      });
      // Handle success
      setMessage('Book checked out sucessfully');
      console.log(res.data);
    } catch (err) {
      // Handle error
      setMessage('Error checking out the book');
      console.error(err);
    }
  };

  const onReturnClick = async (id) => {
    try {
      const res = await axios.put(`http://localhost:8082/api/books/${id}/return`, {
        username: loggedInUsername // pass username of currently logged in user
      });
      // Handle success
      setMessage('Book returned successfully!');
      console.log(res.data);
    }
    catch (err) {
      // Handle error
      setMessage('Error returning the book');
      console.error(err);
    }
  }

  const BookItem = (
    <div>
      <table className='table table-hover table-dark'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Title</td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>Author</td>
            <td>{book.author}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>ISBN</td>
            <td>{book.isbn}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>Publisher</td>
            <td>{book.publisher}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>Published Date</td>
            <td>{book.published_date}</td>
          </tr>
          <tr>
            <th scope='row'>6</th>
            <td>Description</td>
            <td>{book.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='ShowBookDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br />
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Book List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Book's Record</h1>
            <p className='lead text-center'>View Book's Info</p>
            <hr />
            <br />
          </div>
          
          {message && <p style={{ color: 'yellow' }}>{message}</p>}

          <div className='col-md-10 m-auto'>{BookItem}</div>
          <div className='col-md-4 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(book._id);
              }}
            >
              Delete Book
            </button>
          </div>
          <div className='col-md-4 m-auto'>
              <button
                  type='button'
                  className='btn btn-lg btn-block btn-outline-success'
                  onClick={() => {
                      if (!isBookAvailableForCheckout && isUserAbleToReturn) {
                        // book is checked out and user can return it  
                        onReturnClick(book._id);
                      }
                      else if (isBookAvailableForCheckout) {
                        // book can be checked out by the user
                        onCheckOutClick(book._id);
                      }
                  }}
                  disabled={!isBookAvailableForCheckout && !isUserAbleToReturn}
              >
                {isBookAvailableForCheckout ? 'Check Out Book' : 'Return Book'}
              </button>
          </div>
          <div className='col-md-4 m-auto'>
            <Link
              to={`/edit-book/${book._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit Book
            </Link>
          </div>
          <div className='col-md-4 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowBookDetails;