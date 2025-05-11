// src/pages/DestinationsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './DestinationsPage.css'; // Create this CSS file next

// Dummy data for destinations
const destinationsData = [
    { id: 1, name: 'New York City', code: 'NYC', image: 'https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_1200,g_auto/f_auto/q_auto/v1/shutterstock_329662223_ss_non-editorial_3_csm8lw?_a=BAVAZGDX0', description: 'The city that never sleeps! Explore landmarks like the Statue of Liberty and Times Square.' },
    { id: 2, name: 'Los Angeles', code: 'LAX', image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6a/a5/77.jpg', description: 'Sunny beaches, Hollywood glamour, and endless entertainment.' },
    { id: 3, name: 'Paris', code: 'CDG', image: 'https://ma.visamiddleeast.com/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/destinations/paris/marquee-travel-paris-800x450.jpg', description: 'The City of Lights, famous for the Eiffel Tower, Louvre Museum, and charming cafes.' },
    { id: 4, name: 'Tokyo', code: 'HND', image: 'https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/gettyimages-1390815938?_a=BAVAZGDX0', description: 'A vibrant mix of modern skyscrapers and traditional temples.' },
     { id: 5, name: 'Dehli', code: 'DEL', image: 'https://delhitourism.gov.in/dt/images/About_Img.jpg', description: 'A city rich in history, culture, and cuisine. Explore the Red Fort and India Gate.' },
    { id: 6, name: 'Dubai', code: 'DXB', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV5mfsFZOSmU3JXQ5Cos76Z_HZjdn5sHEOVw&s', description: 'Modern architecture, luxury shopping, and desert adventures.' },
];

function DestinationsPage() {
  return (
    <div className="destinations-container">
      <h1>Explore Our Destinations</h1>
      <p>Discover amazing places to visit and find flight deals.</p>

      <div className="destinations-grid">
        {destinationsData.map(destination => (
          <div key={destination.id} className="destination-card">
            <img src={destination.image} alt={destination.name} />
            <h3>{destination.name} ({destination.code})</h3>
            <p>{destination.description}</p>
            {/* Link to potentially search for flights to this destination */}
             {/* For now, link back to home. Later, we could pre-fill search or link to a search results page */}
            <Link to="/" className="explore-flights-button">
                Find Flights to {destination.code}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DestinationsPage;