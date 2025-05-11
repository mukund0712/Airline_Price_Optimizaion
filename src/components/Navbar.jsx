// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

// Receive user and onLogout props
function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to="/" className="site-title">
          Airline Price Optimizer
        </NavLink>
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/destinations">Destinations</NavLink>
          </li>
           <li>
             <NavLink to="/data-viz">Data Viz</NavLink>
          </li>

          {user ? ( // Conditionally render based on user state
              <>
                 <li> {/* Show Profile link if logged in */}
                    <NavLink to="/profile">Profile</NavLink>
                 </li>
                 <li> {/* Show Logout button/link if logged in */}
                    {/* Using a button inside li, trigger logout on click */}
                   <button onClick={onLogout} className="nav-logout-button">
                       Logout
                   </button>
                 </li>
              </>
          ) : ( // Show Login/Signup links if logged out
              <>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup">Sign Up</NavLink>
                  </li>
              </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;