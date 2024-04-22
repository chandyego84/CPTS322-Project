import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// components
import CreateBook from "./components/CreateBook.jsx";
import ShowBookList from "./components/ShowBookList.jsx";
import ShowBookDetails from "./components/ShowBookDetails";
import UpdateBookInfo from "./components/UpdateBookInfo";
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowBookList />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/login" element={<LogIn />} />
        <Route path="/create-book" element={<CreateBook />} />
        <Route path="/show-book/:id" element={<ShowBookDetails />} />
        <Route path="/edit-book/:id" element={<UpdateBookInfo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
