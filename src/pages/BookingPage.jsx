// src/pages/BookingPage.jsx
import React, { useState, useEffect, useRef } from 'react'; // Import useEffect, useRef
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation, useNavigate
import TicketDisplay from '../components/TicketDisplay'; // Import TicketDisplay
import { FaCreditCard, FaUser, FaCalendarCheck } from 'react-icons/fa'; // Icons
import { gsap } from 'gsap'; // Import GSAP
import './BookingPage.css'; // Create this CSS file next

function BookingPage() {
  const location = useLocation(); // Hook to access location state
  const navigate = useNavigate(); // Hook for navigation

  // Get the flight data passed from HomePage
  const selectedFlight = location.state?.selectedFlight;

  // State for traveler form data
  const [travelerData, setTravelerData] = useState({
      fullName: '',
      age: '',
      email: '', // Maybe pre-fill from user state if logged in?
      phone: '',
      // Add more fields like gender, passenger type, etc.
  });

  // State for payment simulation
  const [paymentData, setPaymentData] = useState({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
  });

  // State to track booking status
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null); // Store details for the ticket

  // Refs for GSAP animations
  const bookingContainerRef = useRef(null);
  const formSectionRef = useRef(null);
  const ticketSectionRef = useRef(null);


  // Redirect if no flight data is passed (user landed here directly)
  useEffect(() => {
    if (!selectedFlight) {
      alert("Please select a flight first.");
      navigate('/'); // Redirect to home page
    }
  }, [selectedFlight, navigate]); // Depend on selectedFlight and navigate

  // GSAP animation for page entrance
  useEffect(() => {
      if (bookingContainerRef.current && !isBookingConfirmed) { // Animate form if not confirmed yet
           gsap.fromTo(bookingContainerRef.current,
               { opacity: 0, y: 50 },
               { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
           );
      }
       if (isBookingConfirmed && ticketSectionRef.current) { // Animate ticket if confirmed
            gsap.fromTo(ticketSectionRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
            );
       }
  }, [isBookingConfirmed]); // Re-run animation if booking status changes


  // Handle input changes for traveler data
  const handleTravelerInputChange = (e) => {
      const { id, value } = e.target;
      setTravelerData(prevData => ({
          ...prevData,
          [id]: value,
      }));
  };

  // Handle input changes for payment data
   const handlePaymentInputChange = (e) => {
      const { id, value } = e.target;
      setPaymentData(prevData => ({
          ...prevData,
          [id]: value,
      }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
      e.preventDefault();

      // --- Basic Frontend Validation ---
      if (!travelerData.fullName || !travelerData.email || !paymentData.cardNumber) {
          alert("Please fill in all required fields (Full Name, Email, Card Number).");
          return;
      }
      // Add more comprehensive validation here (email format, card number format, etc.)

      console.log("Booking attempt with:", { travelerData, paymentData, flight: selectedFlight });

      // --- Simulate Booking Process ---
      // In a real app: Send data to backend API for payment processing and booking
      // This involves sensitive info and requires a secure backend/payment gateway.
      // For this simulation, we'll just pretend it succeeded after a short delay.

      // Simulate a delay
      // setIsLoading(true); // Optional: Add a loading state

      setTimeout(() => {
         // Simulate successful booking
         const generatedBookingRef = 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(); // Generate random ref
         const issueDate = new Date().toISOString(); // Get current date/time

         const confirmedDetails = {
             flight: selectedFlight,
             travelerName: travelerData.fullName,
             bookingRef: generatedBookingRef,
             issueDate: issueDate,
             // Include other details as needed
         };

         setBookingDetails(confirmedDetails); // Store details for ticket
         setIsBookingConfirmed(true); // Set booking as confirmed
         // setIsLoading(false); // Optional: Turn off loading

         console.log("Booking Confirmed:", confirmedDetails);

         // In a real app, you might then:
         // - Send confirmation email
         // - Store booking in user's profile (backend)
         // - Redirect to a dedicated confirmation page URL
         // navigate('/confirmation/' + generatedBookingRef); // Example redirect
          alert("Booking successful! See your E-Ticket below.");

      }, 1500); // Simulate 1.5 seconds processing time

       // --- End Simulated Booking Process ---
  };


  if (!selectedFlight) {
      // Render placeholder or null while redirecting
      return <div className="loading-redirect">Loading or redirecting...</div>;
  }

  // Display the confirmation/ticket if booked, otherwise display the form
  if (isBookingConfirmed) {
      return (
          <div className="booking-container confirmed" ref={bookingContainerRef}>
              <div ref={ticketSectionRef}> {/* Wrapper for GSAP on ticket */}
                 <TicketDisplay bookingDetails={bookingDetails} />
              </div>
              {/* Optional: Add buttons like "Go to Profile", "Book Another", etc. */}
              <div className="post-booking-actions">
                  <button onClick={() => navigate('/profile')} className="secondary-button">Go to Profile</button>
                  <button onClick={() => navigate('/')} className="primary-button">Book Another Flight</button>
              </div>
          </div>
      );
  }


  // Display the booking form if not yet confirmed
  return (
    <div className="booking-container" ref={bookingContainerRef}>
      <h1>Book Your Flight</h1>

       {/* Display selected flight details */}
        <div className="selected-flight-summary">
            <h2>Selected Flight</h2>
            <p><strong>Airline:</strong> {selectedFlight.airline}</p>
            <p><strong>Route:</strong> {selectedFlight.origin} to {selectedFlight.destination}</p>
            <p><strong>Date:</strong> {selectedFlight.date}</p>
            <p><strong>Price:</strong> ${selectedFlight.price}</p>
            {/* Add more flight details if needed */}
        </div>


      <form className="booking-form" onSubmit={handleSubmit} ref={formSectionRef}> {/* Attach ref to form for animation */}
        <div className="form-section">
            <h3><FaUser /> Traveler Details</h3>
             <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              <input type="text" id="fullName" required value={travelerData.fullName} onChange={handleTravelerInputChange} />
            </div>
             <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input type="number" id="age" value={travelerData.age} onChange={handleTravelerInputChange} min="0" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" required value={travelerData.email} onChange={handleTravelerInputChange} />
            </div>
             <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="tel" id="phone" value={travelerData.phone} onChange={handleTravelerInputChange} />
            </div>
            {/* Add more traveler fields here */}
        </div>

         <div className="form-section">
            <h3><FaCreditCard /> Payment Information (Simulated)</h3>
             {/* Add payment form fields */}
             <div className="form-group">
              <label htmlFor="cardholderName">Cardholder Name:</label>
              <input type="text" id="cardholderName" value={paymentData.cardholderName} onChange={handlePaymentInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number:</label>
              <input type="text" id="cardNumber" required value={paymentData.cardNumber} onChange={handlePaymentInputChange} />
            </div>
            <div className="form-group group-inline"> {/* Example of inline groups */}
              <div className="inline-item">
                <label htmlFor="expiryDate">Expiry Date:</label>
                <input type="text" id="expiryDate" placeholder="MM/YY" value={paymentData.expiryDate} onChange={handlePaymentInputChange} />
              </div>
               <div className="inline-item">
                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" value={paymentData.cvv} onChange={handlePaymentInputChange} />
              </div>
            </div>
            {/* Real payment integration is complex and requires backend */}
        </div>


        <button type="submit"><FaCalendarCheck /> Confirm Booking</button> {/* Add icon */}
      </form>
    </div>
  );
}
export default BookingPage;