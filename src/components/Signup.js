import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css'; 
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegFlag } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";import { FaLock } from "react-icons/fa";
import axios from 'axios';


const Signup = ({ onBack }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    country: '',
    organization: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    
    if (!formData.username || !formData.email || !formData.country || !formData.password || !formData.confirmPassword) {
      setError("All fields except 'organization' are required.");
      return;
    }

    //  Check password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
  
      const response = await axios.post('http://localhost:8000/user/register/', {
        username: formData.username,
        email: formData.email,
        country: formData.country,
        organization: formData.organization,
        password: formData.password
      });


      if (response.status === 200) {
        alert('User registered successfully!');
        navigate('/loginsignup');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to register user. Please try again.');
    }
  };
  return (
        <div className="signup-form">
          <button className="back-btn" onClick={onBack}> ← Back</button> 
          <h2 >Start Your Podcasting Journey</h2>
          <form >
            <div className="input-group">
              <label>Username <FaUser /></label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required placeholder='username'
              />
            </div>
            <div className="input-group">
              <label>Email  <MdEmail/></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required placeholder='email'
              />
            </div>
            <div className="input-group">
              <label>Country <FaRegFlag /></label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required placeholder='country'
              />
            </div>
            <div className="input-group">
              <label>Organization (Optional) <GrOrganization /></label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange} placeholder='organization'
              />
            </div>
            <div className="input-group">
              <label>Password <FaLock /></label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required  placeholder='password'
              />
            </div>
            <div className="input-group">
              <label>Confirm Password <FaLock /></label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required placeholder='comfirm password'
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="signup-btn" onClick={handleSignup}>Sign Up</button>
          </form>
          <div className="login">
            <p>Already have an account? <button  className="login-link" onClick={onBack}>Login</button></p>
          </div>
        </div>
  );
};

export default Signup;