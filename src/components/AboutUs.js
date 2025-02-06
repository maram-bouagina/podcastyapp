import React from 'react';
import './AboutUs.css'; // Import the CSS for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="hero-section">
        <h1 className='h1'>About Podcasty</h1>
        <p className='p1'>Your go-to platform for podcast creation, hosting, and distribution.</p>
      </div>
      
      <div className="about-content">
        <section className="our-story">
          <h2>Our Story</h2>
          <p className='p2'>
            Podcasty started with a simple mission: to empower creators by providing a platform 
            that makes podcasting easy and accessible to everyone. From hobbyists to professionals, 
            we are here to help you share your voice with the world.
          </p>
        </section>

        <section className="our-mission">
          <h2>Our Mission</h2>
          <p className='p2'>
            We aim to provide a seamless experience for creators, helping them manage everything 
            from recording to distribution. Whether you’re just starting or growing your audience, 
            Podcasty supports you every step of the way.
          </p>
        </section>

        <section className="our-team">
          <h2>Our Team</h2>
          <p className='p2'>
            Our team is made up of passionate individuals who are dedicated to making podcasting easier 
            and more fun. From tech experts to customer support, everyone at Podcasty works hard to provide 
            the best service to our creators.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
