// src/components/TicketDisplay.jsx
import React from 'react';
import { FaPlane, FaTicketAlt, FaUserCircle } from 'react-icons/fa';
import './TicketDisplay.css'; // Create this CSS file next

function TicketDisplay({ bookingDetails }) {
    if (!bookingDetails) {
        return null; // Don't render if no booking details
    }

    const { flight, travelerName, bookingRef, issueDate } = bookingDetails;

    return (
        <div className="ticket">
            <div className="ticket-header">
                <h2><FaTicketAlt /> E-Ticket Confirmation</h2>
                 <div className="booking-ref">Booking Reference: <strong>{bookingRef}</strong></div>
            </div>
            <div className="ticket-body">
                <div className="section flight-info">
                    <h3><FaPlane /> Flight Details</h3>
                    <p><strong>Airline:</strong> {flight.airline}</p>
                    <p><strong>Route:</strong> {flight.origin} to {flight.destination}</p>
                    <p><strong>Date:</strong> {flight.date}</p>
                    <p><strong>Duration:</strong> {flight.duration}{flight.stops > 0 && ` (${flight.stops} stop${flight.stops > 1 ? 's' : ''})`}</p>
                     {/* Add time, gate, seat info later if available */}
                </div>

                <div className="section traveler-info">
                     <h3><FaUserCircle /> Traveler Information</h3>
                     <p><strong>Name:</strong> {travelerName}</p>
                     {/* Add age, passenger type etc. later if collected */}
                </div>

                 <div className="section booking-summary">
                     <h3>Booking Summary</h3>
                     <p><strong>Total Price:</strong> ${flight.price}</p>
                     <p><strong>Issue Date:</strong> {new Date(issueDate).toLocaleDateString()}</p> {/* Format date */}
                     {/* Add payment method, status etc. later */}
                </div>
            </div>
             {/* Optional: Barcode/QR code placeholder */}
            <div className="ticket-footer">
                <p>Thank you for flying with us!</p>
                 {/* Could add a barcode/QR code image placeholder here */}
            </div>
        </div>
    );
}

export default TicketDisplay;