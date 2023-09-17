import React, { useState } from 'react';
import axios from 'axios';

function LoginComponent() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', formData);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        if (response.data.redirectTo) {
          window.location.href = response.data.redirectTo;
        }
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred.');
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email or Username:</label>
        <input type="text" name="username" required onChange={handleInputChange} />
        <br />

        <label>Password:</label>
        <input type="password" name="password" required onChange={handleInputChange} />
        <br />

        <input type="submit" value="Login" />
      </form>
      <div style={{ color: 'red' }}>{errorMessage}</div>
      <a href="/password-reset-request">Forgot Password?</a>
      <a href="/register">Register</a>
    </div>
  );
}

export default LoginComponent;
