// src/App.jsx - Add a useEffect hook for background animation

import React, { useState, useEffect } from 'react'; // Ensure useEffect is imported
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DestinationsPage from './pages/DestinationsPage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage';
 import DataVizPage from './pages/DataVizPage';
import ComparePage from './pages/ComparePage';
import './App.css';
import { gsap } from 'gsap'; // Import GSAP


function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

   // --- Subtle Background Animation (Optional) ---
  useEffect(() => {
    // Target the body or a specific background element
    gsap.to('body', {
      backgroundPosition: '20% 0%', // Animate background position slightly
      duration: 60, // Long duration for subtlety
      ease: "linear", // Smooth, linear motion
      repeat: -1, // Infinite repeat
      yoyo: true // Reverse the animation back and forth
    });
     // You might need a specific background image or gradient CSS in App.css
     // or style body directly here or in App.css to make this visible.
     // The gradient added in App.css in Part 5 might show some movement.
  }, []); // Run once on mount


  const handleLogin = (userData) => {
    console.log('Simulating Login for:', userData);
    setUser({ name: 'Simulated User', email: userData.email });
    navigate('/profile');
  };

  const handleSignup = (userData) => {
    console.log('Simulating Signup for:', userData);
    setUser({ name: userData.fullName, email: userData.email });
    navigate('/profile');
  };

  const handleLogout = () => {
    console.log('Simulating Logout');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="App">
      <Navbar user={user} onLogout={handleLogout} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLogin} />} />
          <Route path="/signup" element={<SignupPage onSignupSuccess={handleSignup} />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/profile" element={<ProfilePage user={user} onLogout={handleLogout} />} />
          <Route path="/booking/:flightId?" element={<BookingPage user={user} />} />
          <Route path="/data-viz" element={<DataVizPage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;