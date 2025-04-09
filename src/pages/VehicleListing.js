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
  }, [auth.token]);

  return (
    <div>
      <Nav />
      <h3 style={{ textAlign: 'center', color:"grey" }}>Vehicle Listing Page</h3>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <div style={{ margin: '0 auto', width: '80%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px' }}>
          {vehicles.map((vehicle, index) => (
            <div key={index} style={vehicleCardStyle}>

               <div style={imageContainerStyle}>
                   {vehicle.car_image && vehicle.car_image.data ? (
                     <img
                       src={`data:image/jpeg;base64,${Buffer.from(vehicle.car_image.data).toString('base64')}`}
                       alt={`${vehicle.brand} car`}
                       style={{objectFit: 'cover', width: '200px', height: '200px', borderRadius: '10px'}}
                     />
                   ) : (
                     <p>No car image available</p>
                   )}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={vehicleInfoStyle}>
                    <p style={{textAlign:'center'}}><strong>{vehicle.brand} {vehicle.model_name}</strong></p>
                    <p><strong>Year:</strong> {vehicle.year}</p>
                    <p><strong>Location:</strong> {vehicle.location}</p>
                    <p><strong>Status:</strong> {vehicle.status || 'N/A'}</p>
                  </div>
    
                  <div style={imageContainerStyle}>
                    <div>
                      <p style={{margin: '0', fontSize: '12px', fontWeight: '600', color: '#333'}}><strong></strong> Rs. {vehicle.price_per_day}</p>
                      {/* <button style={{border:'1px solid #00563B', borderRadius:'4px'}}>Book</button> */}
                    </div>  
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {/* Renter image or name initial */}
                        {vehicle.user_image ? (
                          <img
                          src={vehicle.user_image}
                          alt={`${vehicle.name}'s image`}
                          style={{width: '35px', height: '35px', objectFit: 'cover', borderRadius: '50%'}}
                          />
                        ) : (
                          <div style={circleStyle}>
                            {vehicle.name?.charAt(0).toUpperCase() || "?"}
                          </div>
                        )}
                        <h4 style={{margin: '0', fontSize: '10px', fontWeight: '600', color: '#333'}}>{vehicle.name}</h4>
                    </div>
                 </div>
             </div> 

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const vehicleCardStyle = {
  display: 'flex',
  width: '200px',
  height: '370px',
  flexDirection: 'column',
  // flexWrap: 'wrap',
  padding: '5px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fafafa',
};

const imageContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  // border: '1px solid #ddd',     // 1 box
};

const vehicleInfoStyle = {
  // border: '1px solid #ddd', 
  fontSize: '12px'
};

const circleStyle = {
  width: '35px', height: '35px', objectFit: 'cover', borderRadius: '50%',
  backgroundColor: 'grey',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
};

export default VehicleListing;
