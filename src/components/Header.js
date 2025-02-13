// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from "./Auth";
import './Header.css';
import { useContext } from "react";
import { SearchContext } from "./searchcontext"; 
function Header( {className}) {
  const {token, logout,role } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false); 
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);

  const [showMyPodcasts, setShowMyPodcasts] = useState(false);
  const [LatestPodcasts, setLatestPodcasts] = useState(false);
  const [AdminMessages, setAdminMessages] = useState(false);
  const [SuperAdminPage, setSuperAdminPage] = useState(false);
  const { valueSearch, setValueSearch } = useContext(SearchContext)

  const location = useLocation(); 
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) { 
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    setShowSearch(location.pathname !== '/LatestPodcasts');
    setLatestPodcasts(location.pathname !== '/LatestPodcasts');
    setShowContactUs(location.pathname !== '/ContactUs');
    setShowAboutUs(location.pathname !== '/AboutUs');
    setShowMyPodcasts(location.pathname !== '/MyPodcasts');
    setAdminMessages(location.pathname !== '/AdminMessages');
    setSuperAdminPage(location.pathname !== '/super-admin');
  }, [location]);;


  return (
    <header  className={`header ${isScrolled ? "scrolled" : ""} ${className || ""}`}>
  <div className="logo">
    <Link to="/">
      <img src="/Podcasty Logo.png" alt="Podcasty Logo" className="logo-img" />
    </Link>
  </div>
  <nav className="nav">
    { !showSearch && <div className="search-bar">
        <input type="text" placeholder="Search" className="search-input"   value={valueSearch}
        onChange={(e) => setValueSearch(e.target.value)}/>
        <button className="search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="search-icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m2.14-5.32a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
          </svg>
        </button>
      </div >}
  
      <ul className="nav-links">
      {showAboutUs && (
        <li>
          <button className="nav-btn" onClick={() => navigate('/AboutUs')}>
            About us
          </button>
        </li>
      )}
      {showContactUs && (
        <li>
          <button className="nav-btn" onClick={() => navigate('/ContactUs')}>
            Contact us
          </button>
        </li>
      )}
      {LatestPodcasts && (
        <li>
          <button className="nav-btn" onClick={() => navigate('/LatestPodcasts')}>
            Latest podcasts
          </button>
        </li>
      )}
      {showMyPodcasts && token && (
        <li>
          <button className="nav-btn" onClick={() => navigate('/MyPodcasts')}>
            My podcasts
          </button>
        </li>
      )}
      {AdminMessages && token && (role === 'admin' || role === 'super-admin') && (
        <li>
          <button className="nav-btn" onClick={() => navigate('/AdminMessages')}>
            Contact for Admin
          </button>
        </li>
      )}
      {SuperAdminPage && role === 'super-admin' && (
        <li>
          <button className="nav-btn" onClick={() => navigate('/super-admin')}>
            Super Admin
          </button>
        </li>
      )}
    </ul>
     
       <div className="container">
       {!token  && <button className="btn" onClick={() => navigate('/LoginSignUp')}>Log in / sign up</button>}
       {token && <button className="btn" onClick={logout}>Log out</button>}
       </div>
   
    
  </nav>
</header>
 
  );
}

export default Header;