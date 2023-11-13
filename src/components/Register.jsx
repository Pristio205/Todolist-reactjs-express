import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://real-jade-seagull-gown.cyclic.app/auth/regis', formData);
      console.log(response.data);
      alert("registration succesfull!");
      navigate("/Login");
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className='register-container'>
        <div className='form-register'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <br />
                <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </label>
                <br />
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
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
  );  
};

export default Register;
