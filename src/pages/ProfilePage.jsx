// src/pages/ProfilePage.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaUserCircle, FaTicketAlt, FaPlane } from 'react-icons/fa'; // Icons for profile sections
import './ProfilePage.css'; // Create this CSS file next
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Dummy data for tickets

const dummyUpcomingFlights = [
    { id: 101, bookingRef: 'XYZ789', airline: 'Airline A', origin: 'JFK', destination: 'LAX', date: '2023-11-15', time: '10:00 AM', status: 'Confirmed', price: 280 },
    { id: 102, bookingRef: 'ABC123', airline: 'Airline B', origin: 'LAX', destination: 'JFK', date: '2023-11-20', time: '03:00 PM', status: 'Confirmed', price: 310 },
];

const dummyPastTickets = [
     { id: 201, bookingRef: 'PQR456', airline: 'Airline C', origin: 'LHR', destination: 'CDG', date: '2023-09-01', time: '09:00 AM', status: 'Completed', price: 150 },
     { id: 202, bookingRef: 'MNO789', airline: 'Airline D', origin: 'JFK', destination: 'MIA', date: '2023-07-10', time: '01:00 PM', status: 'Completed', price: 200 },
];


function ProfilePage({ user, onLogout }) { // Receive user and onLogout from App
  const navigate = useNavigate();

  // Redirect to login if not logged in (simulated)
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]); // Depend on user and navigate

  // Refs for GSAP animations
  const profileContainerRef = useRef(null);
  const userInfoRef = useRef(null);
  const upcomingFlightsRef = useRef(null);
  const pastTicketsRef = useRef(null);

  useEffect(() => {
      if(user) { // Only run animations if user is logged in and page is rendered
          const tl = gsap.timeline();
          tl.fromTo(userInfoRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
          )
          .fromTo([upcomingFlightsRef.current, pastTicketsRef.current], // Animate both sections together
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: "power2.out" },
              "-=0.4" // Start shortly before user info animation ends
          );
      }
  }, [user]); // Re-run animation if user state changes (e.g., logs in on this page - less common but safe)


  if (!user) {
      // Can return a loading indicator or null while redirecting
      return <div>Redirecting to login...</div>;
  }


  // Use the passed user prop instead of dummyUser if available
  const currentUser = user; // user prop comes from simulated auth state


  return (
    <div className="profile-container" ref={profileContainerRef}>
      <h1><FaUserCircle /> Your Profile</h1>

       <div className="profile-section user-info" ref={userInfoRef}>
           <h2>User Information</h2>
           <p><strong>Name:</strong> {currentUser.name}</p>
           <p><strong>Email:</strong> {currentUser.email}</p>
           {/* Add more user info fields here later */}
            {/* Add logout button */}
           <button className="logout-button" onClick={onLogout}>Logout</button>
       </div>


      <div className="profile-section upcoming-flights" ref={upcomingFlightsRef}>
          <h2><FaPlane /> Upcoming Flights</h2>
          {dummyUpcomingFlights.length > 0 ? (
              <ul className="ticket-list">
                  {dummyUpcomingFlights.map(flight => (
                      <li key={flight.id} className="ticket-item upcoming">
                          <div><strong>{flight.airline}</strong> - {flight.origin} to {flight.destination}</div>
                          <div>Date: {flight.date} | Time: {flight.time} | Ref: {flight.bookingRef}</div>
                          {/* Add button to view ticket details later */}
                      </li>
                  ))}
              </ul>
          ) : (
              <p>You have no upcoming flights.</p>
          )}
      </div>

      <div className="profile-section past-tickets" ref={pastTicketsRef}>
          <h2><FaTicketAlt /> Past Tickets</h2>
           {dummyPastTickets.length > 0 ? (
              <ul className="ticket-list">
                  {dummyPastTickets.map(ticket => (
                      <li key={ticket.id} className="ticket-item past">
                           <div><strong>{ticket.airline}</strong> - {ticket.origin} to {ticket.destination}</div>
                           <div>Date: {ticket.date} | Time: {ticket.time} | Ref: {ticket.bookingRef}</div>
                           {/* Add button to view ticket details later */}
                      </li>
                  ))}
              </ul>
          ) : (
              <p>You have no past flight bookings.</p>
          )}
      </div>

      {/* Section for saved searches, preferences, etc. can be added later */}

    </div>
  );
}
export default ProfilePage;