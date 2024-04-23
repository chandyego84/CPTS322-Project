import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowBookList from "./components/ShowBookList.jsx";
import CreateBook from "./components/CreateBook.jsx";
import ShowBookDetails from "./components/ShowBookDetails";
import UpdateBookInfo from "./components/UpdateBookInfo";
import SignUp from './components/SignUp';
import Login from './components/LogIn';
import UserBookList from './components/UserCheckedOutList.jsx';

function AppRouter() {
  const [loggedInUsername, setLoggedInUsername] = useState(null);

  const handleLogin = (username) => {
    setLoggedInUsername(username);
  };

  const handleLogout = () => {
    setLoggedInUsername(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowBookList loggedInUsername={loggedInUsername} onLogout={handleLogout} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/create-book" element={<CreateBook loggedInUsername={loggedInUsername} />} />
        <Route path="/show-book/:id" element={<ShowBookDetails loggedInUsername={loggedInUsername} onLogout={handleLogout} />} />
        <Route path="/edit-book/:id" element={<UpdateBookInfo loggedInUsername={loggedInUsername} />} />
        <Route path="/user-book-list" element={<UserBookList loggedInUsername={loggedInUsername} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;