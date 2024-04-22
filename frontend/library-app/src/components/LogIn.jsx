import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Login({ onLogin }) {
  const { logIn } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    successMessage: '',
    errorMessage: '',
  });

  const { username, password, successMessage, errorMessage } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, error } = await logIn(username, password);
    if (success) {
      setFormData({
        ...formData,
        successMessage: 'You logged in successfully!',
        errorMessage: '',
      });
      onLogin(username); // Call the onLogin prop function with the logged-in username
    } else {
      setFormData({ ...formData, successMessage: '', errorMessage: error });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={onChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/">Show Book List</Link>
    </div>
  );
}

export default Login;