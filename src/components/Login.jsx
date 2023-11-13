import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://real-jade-seagull-gown.cyclic.app/auth/login', formData);
      const token = response.data.token;

      
      localStorage.setItem('token', token);

      console.log(response.data);
      alert("Login successful!");
      
      
      navigate("/TodoList");
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='login-container'>
      <div className='form-login'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <br />
            <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <br />
            <button type="submit">Login</button>
        </form>
      </div>
      
    </div>
  );
};

export default Login;
