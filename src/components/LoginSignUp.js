import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import './LoginSignUp.css'; // For common styling of the container layout

const LoginSignUp = () => {
  const [showSignup, setShowSignup] = useState(false); // State to toggle between login and signup forms

  const toggleForm = () => {
    setShowSignup(true); // Show signup form when clicked
  };

  const handleBack = () => {
    setShowSignup(false); // Return to login form when "Back" is clicked
  };

  return (
<div className="login-signup-page">
        <video 
          src="/Office Stock Footage - People Working As A Team  Group Meeting  Business Footage Free Download.mp4" 
          autoPlay 
          loop 
          muted 
          className="hero-bg-video"
        />
    <div className="left-side">
        
      <div className="text">
        <h1>Connect with your audience</h1>
        <p>With Podcasty, you can create your own podcast and share it with your audience</p>
      </div>
    </div>

    <div className="right-side">
      {/* If showSignup is true, render Signup form, otherwise render Login form */}
      {showSignup ? (
        <Signup onBack={handleBack} />
      ) : (
        <Login onSwitchToSignup={toggleForm} />   
      )}
    </div>
  </div>
  );
};

export default LoginSignUp;


