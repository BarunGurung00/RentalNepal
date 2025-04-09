import React, { useEffect, useState } from 'react';
import Nav from '../Components/nav';
import { useAuth } from '../Components/auth';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = auth.token;
        if (!token) {
          setError("No token provided");
          return;
        }

        const response = await fetch('http://localhost:4000/profile/mybookings', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        console.log("Fetched bookings:", data);
        setBookings(data.bookings); // Assuming the response has a `bookings` field
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [auth.token]); // Re-fetch when auth.token changes

  return (
    <div>
      <Nav />
      <h3 style={{ textAlign: 'center' }}>My Bookings</h3>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      ) : bookings.length === 0 || bookings === null ? (
        <p style={{ textAlign: 'center', color: 'gray' }}>No bookings yet</p>
      ) : (
        <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
          <thead>
            <tr>
              <th style={thStyle}>Booking ID</th>
              <th style={thStyle}>Car Name</th>
              <th style={thStyle}>Start Date</th>
              <th style={thStyle}>End Date</th>
              <th style={thStyle}>Total Price</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td style={tdStyle}>{booking.booking_id}</td>
                <td style={tdStyle}>{booking.car_name}</td>
                <td style={tdStyle}>{new Date(booking.start_date).toLocaleDateString()}</td>
                <td style={tdStyle}>{new Date(booking.end_date).toLocaleDateString()}</td>
                <td style={tdStyle}>{booking.total_price}</td>
                <td style={tdStyle}>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f2f2f2',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};

export default MyBooking;
