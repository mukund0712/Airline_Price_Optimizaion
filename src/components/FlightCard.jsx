// src/components/FlightCard.jsx
import React from 'react';
import './FlightCard.css';

// Accept onBook prop
function FlightCard({ flight, isSelected, onSelect, onBook }) {
  const handleCheckboxChange = () => {
    onSelect(flight.id);
  };

  // Handler for the Book button
  const handleBookClick = () => {
      onBook(flight); // Call the onBook function passed from parent, pass the whole flight object
  };

  return (
    <div className={`flight-card ${isSelected ? 'selected' : ''}`}>
      <div className="flight-details">
        <div className="airline">{flight.airline}</div>
        <div className="route">
          {flight.origin} <span className="arrow">→</span> {flight.destination}
        </div>
        <div className="info">
          Date: {flight.date} | Duration: {flight.duration}
           {flight.stops > 0 && ` | ${flight.stops} stop${flight.stops > 1 ? 's' : ''}`} {/* Display stops if any */}
        </div>
      </div>
      <div className="flight-price">
        ${flight.price}
      </div>
      <div className="flight-actions">
         <label className="compare-checkbox">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
            Compare
          </label>
          {/* Add Book button */}
         <button className="book-button" onClick={handleBookClick}>Book Now</button>
      </div>
    </div>
  );
}

export default FlightCard;