// src/pages/DataVizPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
// Import Chart.js components needed
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, RadialLinearScale, ArcElement, PolarAreaController, PieController } from 'chart.js';
import { Bar, Scatter, Pie } from 'react-chartjs-2';
import './DataVizPage.css';

// Import data files
import flightData from '../data/historical_prices.json';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  PolarAreaController,
  PieController,
  Title,
  Tooltip,
  Legend
);

// Function to generate updated data for simulating live updates
const generateUpdatedData = (originalData) => {
  // Create a copy of the original data with slight variations
  return originalData.map(flight => ({
    ...flight,
    price: flight.price + Math.floor(Math.random() * 400) - 200, // +/- 200 price variation
    duration: Math.max(1.5, flight.duration + (Math.random() * 0.5 - 0.25)), // +/- 0.25 hour variation
    days_left: Math.floor(Math.random() * 15) + 1, // 1-15 days left
  }));
};

function DataVizPage() {
  const [airlineComparisonData, setAirlineComparisonData] = useState(null);
  const [priceDurationData, setPriceDurationData] = useState(null);
  const [departureTimeData, setDepartureTimeData] = useState(null);
  const [currentData, setCurrentData] = useState([]);
  const [updateCounter, setUpdateCounter] = useState(0);
  const dataVizContainerRef = useRef(null);

  // Load initial data
  useEffect(() => {
    setCurrentData(flightData);
  }, []);

  // Function to generate random colors for charts
  const getRandomColor = (index) => {
    const colors = [
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)',
      'rgba(199, 199, 199, 0.7)',
      'rgba(83, 102, 255, 0.7)',
    ];
    return colors[index % colors.length];
  };

  // Set up data refresh interval
  useEffect(() => {
    if (currentData.length === 0) return;
    
    const intervalId = setInterval(() => {
      setCurrentData(generateUpdatedData(flightData));
      setUpdateCounter(prev => prev + 1);
      
      // Animate the update
      gsap.to('.chart-container', {
        opacity: 0.5,
        duration: 0.3,
        onComplete: () => {
          gsap.to('.chart-container', {
            opacity: 1,
            duration: 0.5,
            stagger: 0.1
          });
        }
      });
    }, 6000); // Update every 12 seconds

    return () => clearInterval(intervalId);
  }, [currentData.length]);

  // Process data for charts whenever currentData changes
  useEffect(() => {
    if (currentData.length === 0) return;
    
    // --- Data Processing for Charts ---
    
    // 1. Airline Comparison from current flight data
    const airlines = [...new Set(currentData.map(d => d.airline))];
    const airlineStats = airlines.map(airline => {
      const airlineFlights = currentData.filter(d => d.airline === airline);
      const avgPrice = airlineFlights.reduce((sum, flight) => sum + flight.price, 0) / airlineFlights.length;
      const avgDuration = airlineFlights.reduce((sum, flight) => sum + flight.duration, 0) / airlineFlights.length;
      return { airline, avgPrice, avgDuration, flightCount: airlineFlights.length };
    });

    setAirlineComparisonData({
      labels: airlineStats.map(d => d.airline),
      datasets: [
        {
          label: 'Average Price (₹)',
          data: airlineStats.map(d => d.avgPrice),
          backgroundColor: airlineStats.map((_, i) => getRandomColor(i)),
          borderColor: airlineStats.map((_, i) => getRandomColor(i).replace('0.7', '1')),
          borderWidth: 1,
        }
      ]
    });

    // 2. Price vs Duration Scatter Plot
    setPriceDurationData({
      datasets: [{
        label: 'Price vs Duration',
        data: currentData.map(flight => ({
          x: flight.duration,
          y: flight.price,
          airline: flight.airline,
          flight: flight.flight
        })),
        backgroundColor: currentData.map(flight => {
          const airlineIndex = airlines.indexOf(flight.airline);
          return getRandomColor(airlineIndex);
        }),
        pointRadius: 8,
        pointHoverRadius: 12,
      }]
    });

    // 3. Departure Time Distribution Pie Chart
    const departureTimeCount = {};
    currentData.forEach(flight => {
      if (departureTimeCount[flight.departure_time]) {
        departureTimeCount[flight.departure_time]++;
      } else {
        departureTimeCount[flight.departure_time] = 1;
      }
    });

    setDepartureTimeData({
      labels: Object.keys(departureTimeCount),
      datasets: [{
        label: 'Flights by Departure Time',
        data: Object.values(departureTimeCount),
        backgroundColor: Object.keys(departureTimeCount).map((_, i) => getRandomColor(i)),
        borderColor: Object.keys(departureTimeCount).map((_, i) => getRandomColor(i).replace('0.7', '1')),
        borderWidth: 1,
      }]
    });

    // GSAP Animation for initial load
    if (dataVizContainerRef.current && updateCounter === 0) {
      gsap.fromTo(dataVizContainerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      
      gsap.fromTo(dataVizContainerRef.current.querySelectorAll('.chart-container'),
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.7, stagger: 0.2, ease: "back.out(1.4)" },
        "-=0.4"
      );
    }

  }, [currentData, updateCounter]);

  const airlineComparisonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Price by Airline (Delhi to Mumbai)',
        font: { size: 16 }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Airline'
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (₹)'
        },
        beginAtZero: true
      }
    },
  };

  const scatterChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price vs Duration (Delhi to Mumbai)',
        font: { size: 16 }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const point = context.raw;
            return `${point.airline} ${point.flight}: ₹${point.y} (${point.x} hrs)`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Duration (hours)'
        },
        min: 1.5,
        max: 3
      },
      y: {
        title: {
          display: true,
          text: 'Price (₹)'
        },
        beginAtZero: false
      }
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Flights by Departure Time',
        font: { size: 16 }
      },
    },
  };

  return (
    <div className="data-viz-container" ref={dataVizContainerRef}>
      <h1>Flight Price Data Visualization</h1>
      <p>Explore dynamic flight price trends and comparisons. Data updates automatically every 6 seconds.</p>
      <div className="update-badge">Last updated: {updateCounter > 0 ? `${updateCounter} time${updateCounter !== 1 ? 's' : ''}` : 'Just now'}</div>

      <div className="charts-grid">
        {/* First row - Current flight data */}
        <div className="chart-row">
          {/* Bar Chart: Airlines Comparison */}
          <div className="chart-container">
            <h2>Airline Price Comparison</h2>
            {airlineComparisonData ? (
              <div style={{ height: '350px' }}>
                <Bar data={airlineComparisonData} options={airlineComparisonOptions} />
              </div>
            ) : (
              <p>Loading airline comparison data...</p>
            )}
          </div>

          {/* Scatter Chart: Price vs Duration */}
          <div className="chart-container">
            <h2>Price vs Flight Duration</h2>
            {priceDurationData ? (
              <div style={{ height: '350px' }}>
                <Scatter data={priceDurationData} options={scatterChartOptions} />
              </div>
            ) : (
              <p>Loading price-duration data...</p>
            )}
          </div>
        </div>

        {/* Second row */}
        <div className="chart-row">
          {/* Pie Chart: Departure Time Distribution */}
          <div className="chart-container">
            <h2>Departure Time Distribution</h2>
            {departureTimeData ? (
              <div style={{ height: '350px' }}>
                <Pie data={departureTimeData} options={pieChartOptions} />
              </div>
            ) : (
              <p>Loading departure time data...</p>
            )}
          </div>

          {/* Flight Details Table */}
          <div className="chart-container">
            <h2>Current Flight Details</h2>
            <div className="flight-table-container">
              <table className="flight-table">
                <thead>
                  <tr>
                    <th>Airline</th>
                    <th>Flight</th>
                    <th>Departure</th>
                    <th>Duration</th>
                    <th>Price (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((flight, index) => (
                    <tr key={index}>
                      <td>{flight.airline}</td>
                      <td>{flight.flight}</td>
                      <td>{flight.departure_time.replace('_', ' ')}</td>
                      <td>{flight.duration.toFixed(2)} hrs</td>
                      <td>₹{flight.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Data source note */}
      <p className="data-source-note">
        Live data for Delhi-Mumbai flights updated every 6 seconds. Historical data simulated from Kaggle datasets.
      </p>
    </div>
  );
}

export default DataVizPage;