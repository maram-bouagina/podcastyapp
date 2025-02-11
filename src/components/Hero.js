import React from 'react';
import './Hero.css';
 
const Hero = () => {
  return (
    <section className="hero">
      <div className='video-container' >
        <video 
          src="/Office Stock Footage - People Working As A Team  Group Meeting  Business Footage Free Download.mp4" 
          autoPlay 
          loop 
          muted 
          className="hero-bg-video"
        />
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <h2 className="hero-title">
            Transform Your Voice<br />
            Into a Global<br />
            <span className="gradient-text">Movement</span>
          </h2>
          <p className="hero-description">
            Join thousands of creators who trust Podcasty to bring their stories to life. 
            Professional tools, global distribution, and everything you need to grow your audience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;