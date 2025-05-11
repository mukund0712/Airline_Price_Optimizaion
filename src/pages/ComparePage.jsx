// src/pages/ComparePage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaExchangeAlt, FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaClock, FaMoneyBillWave, FaPlane } from 'react-icons/fa';
import { gsap } from 'gsap';
import './ComparePage.css';

function ComparePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedFlights = location.state?.selectedFlights || [];

  const pageContainerRef = useRef(null);
  const compareTableRef = useRef(null);

  // Find the minimum price among the selected flights
  const minPrice = selectedFlights.length > 0
      ? Math.min(...selectedFlights.map(flight => flight.price))
      : null;

  // Redirect if no flights are selected (check after getting state)
  useEffect(() => {
    if (!selectedFlights || selectedFlights.length < 2) {
      alert("Please select at least two flights to compare.");
      navigate('/');
    }
  }, [selectedFlights, navigate]);

   // GSAP Animation for page entry and table
    useEffect(() => {
        if (pageContainerRef.current && selectedFlights.length >= 2) {
             const tl = gsap.timeline();

             tl.fromTo(pageContainerRef.current,
                 { opacity: 0, y: 50 },
                 { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
             )
             .fromTo(compareTableRef.current,
                 { opacity: 0, y: 30, scaleY: 0.9 },
                 { opacity: 1, y: 0, scaleY: 1, duration: 0.8, ease: "back.out(1.4)" },
                 "-=0.4"
             )
             .fromTo(compareTableRef.current.querySelectorAll('th, td'),
                 { opacity: 0 },
                 { opacity: 1, duration: 0.3, stagger: 0.05, ease: "power1.out" },
                 "-=0.5"
             );
        }
    }, [selectedFlights]);


  if (!selectedFlights || selectedFlights.length < 2) {
      return <div className="loading-redirect">Loading comparison or redirecting...</div>;
  }

  const features = [
      { key: 'airline', label: 'Airline', icon: <FaPlaneDeparture /> },
      { key: 'origin', label: 'Origin', icon: <FaPlaneDeparture /> },
      { key: 'destination', label: 'Destination', icon: <FaPlaneArrival /> },
      { key: 'date', label: 'Date', icon: <FaCalendarAlt /> },
      { key: 'duration', label: 'Duration', icon: <FaClock /> },
      { key: 'stops', label: 'Stops', icon: <FaPlane /> },
      { key: 'price', label: 'Price ($)', icon: <FaMoneyBillWave /> },
  ];


  return (
    <div className="compare-container" ref={pageContainerRef}>
      <h1><FaExchangeAlt /> Compare Flights</h1>
      <p>Side-by-side comparison of selected flights.</p>

      <div className="compare-table-wrapper" ref={compareTableRef}>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Feature</th>
              {selectedFlights.map(flight => (
                <th key={flight.id}>
                   {flight.airline} <br/> ({flight.origin} → {flight.destination})
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map(feature => (
              <tr key={feature.key}>
                <td>
                    <div className="feature-label">
                        {feature.icon} {feature.label}
                    </div>
                </td>
                {selectedFlights.map(flight => (
                  <td
                      key={flight.id}
                      // Add highlight class for the price feature if it's the min price
                      className={feature.key === 'price' && flight.price === minPrice ? 'highlight-best' : ''}
                  >
                     {feature.key === 'price' ? `$${flight[feature.key]}` : (flight[feature.key] !== undefined && flight[feature.key] !== null ? flight[feature.key] : 'N/A')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        <div className="compare-actions">
            <button className="secondary-button" onClick={() => navigate('/')}>Back to Search Results</button>
        </div>
    </div>
  );
}
export default ComparePage;