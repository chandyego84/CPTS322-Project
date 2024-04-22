// SignUp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    successMessage: '',
    errorMessage: '',
  });

  const { username, password, successMessage, errorMessage } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8082/api/profiles/signup', {
        username,
        password,
      });
      setFormData({ ...formData, successMessage: 'You signed up successfully!', errorMessage: '' });
    } catch (err) {
      setFormData({ ...formData, successMessage: '', errorMessage: 'Sign up failed' });
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/">Show Book List</Link>
    </div>
  );
}

export default SignUp;
