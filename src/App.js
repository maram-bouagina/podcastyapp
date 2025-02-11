import React from 'react';  
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';  
import Home from './components/Home';  
import AboutUs from './components/AboutUs';  
import LoginSignUp from './components/LoginSignUp';
import LatestPodcasts from './components/LatestPodcasts'; // Now accessible to all
import ContactUs from './components/ContactUs';
import MyPodcasts from './components/MyPodcasts';
import './App.css';
import { AuthProvider } from './components/Auth.js';
import { useAuth } from "./components/Auth";
import { SearchProvider } from "./components/searchcontext.js";
import AdminMessages from "./components/AdminMessages.js";
import SuperAdminPage from './components/SuperAdminPage';
function App() {
  const auth = useAuth();
  console.log("User Role: 44444444", auth.role);
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<><Header /><Home /></>} />
            <Route path="/AboutUs" element={<><Header /><AboutUs /></>} />
            <Route path="/LoginSignUp" element={<LoginSignUp />} />
            <Route path="/mypodcasts" element={<><MyPodcasts /></>} />
            <Route path="/LatestPodcasts" element={<LatestPodcasts />} /> 
            <Route path="/ContactUs" element={<><Header /><ContactUs/></>} />
            <Route 
            path="/super-admin" element={<SuperAdminPage />} />{/*{auth.role === "super-admin" &&}*/ } 
            <Route path="/AdminMessages" element={<AdminMessages/>} />
          </Routes>
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
};

export default App;
