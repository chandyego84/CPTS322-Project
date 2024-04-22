import { useState } from 'react';
import axios from 'axios';

function useAuth() {
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  
  const signUp = async (username, password) => {
    try {
      // Send sign-up request to the server
      const res = await axios.post('http://localhost:8082/api/profiles/signup', {
        username,
        password,
      });
      // Set loggedInUsername if sign-up is successful
      setLoggedInUsername(username);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.message || 'Sign up failed' };
    }
  };

  const logIn = async (username, password) => {
    try {
      // Send login request to the server
      const res = await axios.post('http://localhost:8082/api/profiles/login', {
        username,
        password,
      });
      // Set loggedInUsername if login is successful
      setLoggedInUsername(username);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const logOut = () => {
    // Perform logout logic (clear local storage, reset state, etc.)
    setLoggedInUsername(null);
  };

  return { loggedInUsername, signUp, logIn, logOut };
}

export default useAuth;
