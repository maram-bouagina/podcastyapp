
import React, { useState } from 'react';
import './login.css'; 
import { useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useAuth } from './Auth'
import axios from 'axios'
const Login = ({ onSwitchToSignup }) => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = useAuth()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const response = await axios.post('http://localhost:8000/auth/login/', {
            email: email,
            password: password
        });

        if (response.status === 200) {
            console.log('Logged in successfully!',response.data);
            console.log("Calling auth.login with:", {
              email: email,
              token: response.data.access_token,
              userId: response.data.userId,
              role: response.data.role
          });
            auth.login(email, response.data.access_token,
            response.data.userId, response.data.role);
            console.log("Auth Context after login:", auth);
            navigate('/home', { replace: true });
        }
    } catch (err) {
        setError(err.response?.data?.detail || 'Invalid email or password.');
    }
};


  const handleBack = () => {
    navigate('/');  
  };


  return (
     <div className="login-form">
     <button className="back-btn" onClick={handleBack}>
     ← Back</button> 
     <h2>Welcome!</h2>
      <h2>Please login to your account.</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email  <MdEmail/> </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required placeholder='email'
          />
        </div>
        <div className="input-group">
          <label>Password <FaLock /></label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
             placeholder='password'
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-btn">Login</button>
        <div className="subscribe">
        <p>Don't have an account? <button className="subscribe-link" onClick={onSwitchToSignup}>Sign up</button></p>
      </div>
      </form>
    
      </div>
  );
};

export default Login;
