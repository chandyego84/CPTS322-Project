import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function SignUp() {
  const { signUp } = useAuth();
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
    const { success, error } = await signUp(username, password);
    if (success) {
      setFormData({
        ...formData,
        successMessage: 'You signed up successfully!',
        errorMessage: '',
      });
    } else {
      setFormData({ ...formData, successMessage: '', errorMessage: error });
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