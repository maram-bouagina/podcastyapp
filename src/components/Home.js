// src/pages/Home.js
import React from 'react';
import { VideoIcon, Mic2, Upload } from 'lucide-react';
import Hero from '../components/Hero';
import './Home.css'; // To style your Home page

const Home = () => {
  return (
    <div className="home">
      <Hero />

      {/* <LatestPodcasts /> */}

      <footer className="services">
          <h1 className='homeh1'>Our Services</h1>
          <div className="service-cards">
            <div className="service-card">
            <div className="service-icon">
              <VideoIcon className="icon" />
            </div>
              <div className='hp'>
              <h3 className='service-title'>Video Editing</h3>
              <p className='servivce-p'>Professional video editing for your podcast episodes.</p>
              </div>
              <div className="image-container">
            <img
              src="https://images.pexels.com/photos/2773498/pexels-photo-2773498.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop"
              alt="Video Editing"  className='service-image'
            />
          </div>
            </div>
            <div className="service-card">
            <div className="service-icon">
            <Mic2 className="icon" />
            </div>
              <div className='hp'>
              <h3 className='service-title'>Sound Enhancement</h3>
              <p className='servivce-p'>Make your podcast sound polished and professional.</p>
              </div>
              <div className="image-container">
            <img
              src="https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop"
              alt="Sound Enhancement" className='service-image'
            />
          </div>
            </div>
            <div className="service-card">
            <div className="service-icon">
            <Upload className="icon" />
            </div>
              <div className='hp'>
              <h3 className='service-title'>Podcast Upload</h3>
              <p className='servivce-p'>Upload your episodes to all major podcast platforms.</p>
              </div>
           
              <div className="image-container">
            <img
              src="https://images.pexels.com/photos/7845182/pexels-photo-7845182.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop"
              alt="Podcast Upload" className='service-image'
            />
          </div>
          </div>
        </div>
        </footer>
      </div>
  );
};

export default Home;
