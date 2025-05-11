// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // We'll create this CSS file shortly

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>© {currentYear} Airline Price Optimization. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;