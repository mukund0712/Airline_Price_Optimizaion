// src/pages/SignupPage.jsx
import React, { useState } from 'react'; // Import useState
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaUserPlus } from 'react-icons/fa'; // Import icon

// Receive onSignupSuccess prop
function SignupPage({ onSignupSuccess }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Attempt:', { fullName, email, password, confirmPassword });

     // Basic validation (real app needs more)
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
     if (!fullName || !email || !password) {
         alert("Please fill in all required fields.");
         return;
     }


    // --- Simulated Signup Logic ---
    // In a real app: send data to backend API to create user
    // If successful, call onSignupSuccess(userData) and maybe automatically log them in
    // If failed (e.g., email exists), show error message

    // Simple simulation: Assume success if validation passes
    // Call the success handler passed from App, maybe pass some user data
    onSignupSuccess({ fullName: fullName, email: email }); // Pass relevant data
    // Redirection handled by onSignupSuccess in App.jsx usually,
    // but navigating here ensures it if handler doesn't
    navigate('/profile'); // Redirection to profile page
    // --- End Simulated Signup Logic ---
  };

  return (
    <div>
      <h2><FaUserPlus /> Sign Up</h2> {/* Add icon */}
      <form onSubmit={handleSubmit}> {/* Attach onSubmit handler */}
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
         <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
         <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default SignupPage;