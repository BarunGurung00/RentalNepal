import React, { useState, useRef } from 'react';
import Nav from '../Components/nav';
import imageCompression from 'browser-image-compression'; 

const PostCar = () => {
  const [carData, setCarData] = useState({
    brand: '',
    model: '',
    year: '',
    location: '',
    price: '',
    image: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData(prev => ({ ...prev, [name]: value }));
   };

  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Check file size (example: max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB! Please choose a smaller file.');
        setCarData(prev => ({ ...prev, error: 'File size exceeds 5MB' }));
        // Clear the file input
        fileInputRef.current.value = ''; // Reset the input field
        return;
      } else {
        setCarData(prev => ({ ...prev, error: null }));
      }

      // Compress the image
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // Set the maximum size to 1MB after compression
          maxWidthOrHeight: 800, // Resize to a reasonable size
          useWebWorker: true,
        });

        // Set the compressed image in state
        setCarData(prev => ({ ...prev, image: compressedFile }));
      } catch (error) {
        console.error('Image compression error:', error);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { brand, model, year, location, price, image } = carData;

    console.log("Form data:", carData);
  
    if (!brand || !model || !year || !location || !price || !image) {
      alert("Please fill all the fields!");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('brand', brand);
      formData.append('model', model);
      formData.append('year', year);
      formData.append('location', location);
      formData.append('price', price);
      formData.append('image', image);
  
      const token = localStorage.getItem("token"); // or wherever you're storing it
  
      const response = await fetch('http://localhost:4000/addcar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Car posted successfully!');
        // Optional: reset form
        // setCarData({
        //   brand: '',
        //   model: '',
        //   year: '',
        //   location: '',
        //   price: '',
        //   image: null,
        // });
        // fileInputRef.current.value = '';
      } else {
        alert(result.error || "Something went wrong");
      }
  
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div>
      <Nav />
      <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
        <h3 style={{ textAlign: 'center', color: 'grey' }}>Post your personal Vehicles for rental</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input style={styles.input} type="text" name="brand" placeholder="Brand" value={carData.brand} onChange={handleChange} required />
          <input style={styles.input} type="text" name="model" placeholder="Model" value={carData.model} onChange={handleChange} required />
          <input style={styles.input} type="number" name="year" placeholder="Year" value={carData.year} onChange={handleChange} required />
          <input style={styles.input} type="text" name="location" placeholder="Location" value={carData.location} onChange={handleChange} required />
          <input style={styles.input} type="number" name="price" placeholder="Price per Day (NPR)" value={carData.price} onChange={handleChange} required />
          <input style={styles.input} type="file" ref={fileInputRef} name="image" accept="image/*" placeholder="Image URL" onChange={handleImageChange} />
          <button style={styles.buttonContainer} type="submit" >Submit</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',           // This ensures the container uses flexbox
    justifyContent: 'center',  // Centers the content horizontally
    alignItems: 'center',      // Centers the content vertically
    height: '100vh',   
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',             // Ensures the form takes up the full width of its container
    maxWidth: '500px',
    margin: '0 auto',         // Centers the form within its container
    justifyContent: 'center',  // Centers the content vertically
    alignItems: 'center',      // Centers the content vertically
  },
  inputGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  label: {
    fontSize: '14px',
    color: '#333',
    width: '150px', // Adjust the width to match the label size
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    width: 'calc(100% - 160px)', // Ensures the input takes up the remaining space
    transition: 'border-color 0.3s ease',
  },
  buttonContainer: {
    padding: '0.5rem', 
    background: '#333', 
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '200px',
    width: 'calc(100% - 160px)', // Ensures the input takes up the remaining space
    borderRadius: "10px",
    maxWidth: '800px',

  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',

  },
  submitButtonHover: {
    backgroundColor: '#45a049',
  },
};

export default PostCar;
