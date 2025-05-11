// src/pages/LoginPage.jsx
import React, { useState } from 'react'; // Import useState
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaSignInAlt } from 'react-icons/fa'; // Import icon

// Receive onLoginSuccess prop
function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Attempt:', { email, password });

    // --- Simulated Login Logic ---
    // In a real app: send email/password to backend API
    // If successful, call onLoginSuccess(userData) with fetched user data
    // If failed, show error message

    // Simple simulation: If email and password are not empty, assume success
    if (email && password) {
        // Call the success handler passed from App
        onLoginSuccess({ email: email, password: password }); // Pass relevant data
        // Redirection handled by onLoginSuccess in App.jsx usually,
        // but navigating here ensures it if handler doesn't
         navigate('/profile'); // Redirection to profile page
    } else {
         alert("Please enter both email and password.");
    }
    // --- End Simulated Login Logic ---
  };

  return (
    <div>
      <h2><FaSignInAlt /> Login</h2>
      <form onSubmit={handleSubmit}> {/* Attach onSubmit handler */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email} // Bind value to state
            onChange={(e) => setEmail(e.target.value)} // Update state on change
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password} // Bind value to state
            onChange={(e) => setPassword(e.target.value)} // Update state on change
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default LoginPage;