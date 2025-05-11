// src/pages/HomePage.jsx - Modify the form structure

import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaUsers, FaSearch, FaChartBar, FaSpinner } from 'react-icons/fa';
import FlightCard from '../components/FlightCard';
import './HomePage.css';
import { Link, useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);
function HomePage() {
  // State for form inputs
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '', // Optional
    passengers: 1,
  });

  // State for search results
  // Use null initially, an array of results later
  const [searchResults, setSearchResults] = useState(null);

  // State to track selected flights for comparison
  const [selectedFlightsIds, setSelectedFlightsIds] = useState([]);

  // State for loading indicator - NEW
  const [isLoading, setIsLoading] = useState(false);

  // Refs for GSAP animation targets
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const searchFormRef = useRef(null);
  // Ref for results section (used for animating the container and cards)
  const searchResultsRef = useRef(null);

  // Ref for "Why Choose Us" section
  const whyChooseUsRef = useRef(null);

  // --- Add useNavigate hook ---
  const navigate = useNavigate();
  // ---------------------------

  // GSAP animation for initial load (unchanged)
  useEffect(() => {
    const tl = gsap.timeline(); // Create a timeline for staggered animations

    tl.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(paragraphRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, delay: -0.5, ease: "power3.out" }, // Negative delay to overlap
      "<" // Start this animation at the same time as the previous one started
    )
    .fromTo(searchFormRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
        "-=0.4" // Start this animation 0.4 seconds before the previous one ends
    )
    // Animate the form groups within the form after the form wrapper animates
    .fromTo(".flight-search-form .form-group", // Target all form groups
       { opacity: 0, y: 20 },
       { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, // Stagger effect
       "-=0.5" // Start this animation 0.5 seconds before the form wrapper animation ends
    )
    .fromTo(".flight-search-form button[type='submit']", // Animate the button
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3" // Start shortly after the last form group
    );
  }, []); // Empty dependency array means this effect runs once on mount


  // Search results animation (trigger when results change AND loading is false) - MODIFIED
  useEffect(() => {
      // Check if there are results, the ref is available, AND we are not currently loading
      if (!isLoading && searchResults && searchResults.length > 0 && searchResultsRef.current) {
          // Use a timeline to animate the container then stagger the cards within it
          const resultsTl = gsap.timeline();

          // Animate the main search results container first
          resultsTl.fromTo(searchResultsRef.current,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
          )
          // Then stagger the animation of the individual flight cards within the container
          // We target elements with the class 'flight-card' inside the ref's element
          .fromTo(searchResultsRef.current.querySelectorAll('.flight-card'),
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
              "-=0.3" // Start staggering cards shortly before the container animation finishes
          );
      }
  }, [searchResults, isLoading]); // Trigger this effect whenever searchResults OR isLoading state changes


  // Handler for input changes (unchanged)
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handler for form submission - MODIFIED to include loading state and clear previous results
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default browser form submission

    console.log('Search Form Data:', formData);

    setIsLoading(true); // Set loading to true
    setSearchResults(null); // Clear previous results immediately
    setSelectedFlightsIds([]); // Clear previous selection immediately

    // --- Placeholder: Simulate search results appearing (using more data) ---
    const dummyResults = [
      { id: 1, airline: 'United Airlines', origin: formData.origin || 'JFK', destination: formData.destination || 'LAX', date: formData.departureDate || '2023-10-27', price: 250, duration: '3h 30m', stops: 0, departureTime: '08:00', arrivalTime: '11:30' },
      { id: 2, airline: 'Delta Air Lines', origin: formData.origin || 'JFK', destination: formData.destination || 'LAX', date: formData.departureDate || '2023-10-27', price: 300, duration: '3h 15m', stops: 0, departureTime: '09:00', arrivalTime: '12:15' },
      { id: 3, airline: 'American Airlines', origin: formData.origin || 'JFK', destination: formData.destination || 'LAX', date: formData.departureDate || '2023-10-27', price: 275, duration: '4h 0m', stops: 1, departureTime: '10:00', arrivalTime: '15:00' },
      { id: 4, airline: 'Southwest Airlines', origin: formData.origin || 'JFK', destination: formData.destination || 'LAX', date: formData.departureDate || '2023-10-27', price: 230, duration: '3h 45m', stops: 0, departureTime: '11:00', arrivalTime: '14:45' },
      { id: 5, airline: 'JetBlue Airways', origin: formData.origin || 'JFK', destination: formData.destination || 'LAX', date: formData.departureDate || '2023-10-27', price: 290, duration: '3h 50m', stops: 0, departureTime: '12:00', arrivalTime: '15:50' },
      // Add a couple more dummy results if needed for testing comparison
      { id: 6, airline: 'United Airlines', origin: formData.origin || 'JFK', destination: formData.destination || 'LAX', date: formData.departureDate || '2023-10-27', price: 260, duration: '4h 10m', stops: 1, departureTime: '13:00', arrivalTime: '18:10' },
      { id: 7, airline: 'Delta Air Lines', origin: formData.origin || 'JFK', destination: formData.destination || 'LAX', date: formData.departureDate || '2023-10-27', price: 310, duration: '3h 25m', stops: 0, departureTime: '14:00', arrivalTime: '17:25' },
    ];

    // Simulate API call delay
    setTimeout(() => {
        setSearchResults(dummyResults);
        setIsLoading(false); // Set loading to false after data is ready
    }, 1500); // Simulate 1.5 seconds loading time

    // --- End Placeholder ---
  };

  // Handler to select/deselect a flight for comparison (unchanged)
  const handleSelectFlight = (flightId) => {
      setSelectedFlightsIds(prevSelected => {
          if (prevSelected.includes(flightId)) {
              // Deselect the flight if it's already selected
              return prevSelected.filter(id => id !== flightId);
          } else {
              // Select the flight if it's not selected
              // Optional: Limit the number of flights allowed for comparison (e.g., max 4)
              if (prevSelected.length < 4) {
                 return [...prevSelected, flightId];
              } else {
                 alert("You can select up to 4 flights for comparison.");
                 return prevSelected; // Don't add if already at limit
              }
          }
      });
  };

  // --- Handler for the Compare button - Added searchResults check ---
  const handleCompareClick = () => {
      if (selectedFlightsIds.length < 2) {
          alert("Please select at least two flights to compare.");
          return;
      }

      // Ensure searchResults is not null before filtering
      if (!searchResults) {
          console.error("Search results are not available to filter.");
          return; // Should not happen if results are displayed, but good practice
      }

      // Find the full flight objects for the selected IDs
      // Use filter on the searchResults array
      const flightsToCompare = searchResults.filter(flight =>
          selectedFlightsIds.includes(flight.id)
      );

      // Optional: Log the found objects for verification
      console.log("Comparing flights:", flightsToCompare);

      // Navigate to the compare page, passing the array of selected flight objects in state
      // The state object will be accessible on the /compare route via useLocation
      navigate('/compare', { state: { selectedFlights: flightsToCompare } });
  };
  // ---------------------------------------------------

  // --- Handler for booking a flight - NEW ---
  const handleBookFlight = (flight) => {
      navigate('/booking', { state: { selectedFlight: flight } });
  };
  // ------------------------------------------


  return (
    <div className="homepage-container">
      <div className="hero-section">
        <h1 ref={headingRef}>Welcome to Airline Price Optimizer</h1>
        <p ref={paragraphRef}>Find the best flight deals and compare prices across different airlines.</p>
      </div>

      <div className="search-section" ref={searchFormRef}>
        <h2><FaSearch /> Find Your Flight</h2>
        <form className="flight-search-form" onSubmit={handleSubmit}>

          {/* Row 1: Origin and Destination */}
          <div className="form-row">
              <div className="form-group">
                <label htmlFor="origin"><FaPlaneDeparture /> Origin:</label>
                <input type="text" id="origin" placeholder="Departure City" required value={formData.origin} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="destination"><FaPlaneArrival /> Destination:</label>
                <input type="text" id="destination" placeholder="Arrival City" required value={formData.destination} onChange={handleInputChange} />
              </div>
          </div>

          {/* Row 2: Departure and Return Dates */}
           <div className="form-row">
              <div className="form-group">
                <label htmlFor="departureDate"><FaCalendarAlt /> Departure Date:</label>
                <input type="date" id="departureDate" required value={formData.departureDate} onChange={handleInputChange} />
              </div>
               <div className="form-group">
                <label htmlFor="returnDate"><FaCalendarAlt /> Return Date:</label>
                <input type="date" id="returnDate" value={formData.returnDate} onChange={handleInputChange} />
              </div>
           </div>

           {/* Row 3: Passengers (single item, centered) */}
           {/* Added passengers-group class */}
           <div className="form-group passengers-group">
            <label htmlFor="passengers"><FaUsers /> Passengers:</label>
            <input type="number" id="passengers" value={formData.passengers} min="1" required onChange={handleInputChange} />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isLoading}>
             {isLoading ? <><FaSpinner className="spinner" /> Searching...</> : 'Search Flights'}
          </button>
        </form>
      </div>

       {isLoading && (
           <div className="loading-indicator">
               <FaSpinner className="spinner" size={30} />
               <p>Searching for the best flights...</p>
           </div>
       )}

      {!isLoading && searchResults && (
          <div className="search-results-section" ref={searchResultsRef}>
              <h2><FaChartBar /> Available Flights ({searchResults.length})</h2>
              {searchResults.length > 0 ? (
                  <>
                    <div className="flight-list">
                        {searchResults.map(flight => (
                            <FlightCard
                                key={flight.id}
                                flight={flight}
                                isSelected={selectedFlightsIds.includes(flight.id)}
                                onSelect={handleSelectFlight}
                                onBook={handleBookFlight}
                            />
                        ))}
                    </div>
                    <button
                        className="compare-button"
                        onClick={handleCompareClick}
                        disabled={selectedFlightsIds.length < 2}
                    >
                        Compare Selected ({selectedFlightsIds.length})
                    </button>
                   </>
              ) : (
                  <p>No flights found for your search criteria.</p>
              )}
          </div>
      )}

        <div className="why-choose-us-section" ref={whyChooseUsRef}>
            <h2 className="section-title">Why Choose Airline Price Optimizer?</h2>
            <div className="features-grid">
                <div className="feature-item">
                    <h3>Compare Smarter</h3>
                    <p>Easily compare multiple flights side-by-side to find the best value based on price, duration, and stops.</p>
                </div>
                 <div className="feature-item">
                    <h3>Data-Driven Insights</h3>
                    <p>Access historical price data and visualizations to understand trends and book at the right time.</p>
                </div>
                 <div className="feature-item">
                    <h3>Seamless Booking</h3>
                    <p>Once you find your perfect flight, our simplified booking process gets you on your way quickly.</p>
                </div>
            </div>
        </div>


        <div className="other-sections">
             <p style={{marginTop: '40px', fontSize: '1.1em'}}>
                 Looking for inspiration? <Link to="/destinations">Explore our destinations</Link>.
             </p>
        </div>
    </div>
  );
}

export default HomePage;