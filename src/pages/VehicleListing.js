import React, { useEffect, useState } from 'react';
import Nav from '../Components/nav';
import { useAuth } from '../Components/auth';
import { Buffer } from 'buffer';

const VehicleListing = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = auth.token;
        if (!token) return;

        const response = await fetch('http://localhost:4000/profile/mycarlists', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
       
        const data = await response.json();
        console.log("Fetched vehicles:", data);
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div>
      <Nav />
      <h3 style={{ textAlign: 'center' }}>Vehicle Listing Page</h3>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
          <thead>
            <tr>
              <th style={thStyle}>Owner Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Brand</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Image</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={index}>
                <td style={tdStyle}>{vehicle.name}</td>
                <td style={tdStyle}>{vehicle.email}</td>
                <td style={tdStyle}>{vehicle.brand}</td>
                <td style={tdStyle}>{vehicle.location}</td>
                <td style={tdStyle}>
                   <img
                     src={`data:image/jpeg;base64,${Buffer.from(vehicle.image.data).toString('base64')}`}
                     alt={`${vehicle.brand} image`}
                     style={{ width: '100px', height: 'auto' }}
                   />
                </td>
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

export default VehicleListing;
