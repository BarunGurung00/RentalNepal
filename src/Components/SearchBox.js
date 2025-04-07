import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import search icon

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if(!query || !pickupDate || !dropoffDate) {
      alert("Please fill in all fields");
      return;
    }
    
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}&pickup=${pickupDate}&dropoff=${dropoffDate}`);
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>

        {/* Pick-up Location (with label & search icon) */}
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Pick-up Location</label>
          <div style={searchContainerStyle}>
            <FaSearch style={searchIconStyle} size="18" />
            <input
              type="text"
              placeholder="Enter location"
              style={inputWithIconStyle}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Pick-up Date */}
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Pick-up Date</label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Drop-off Date */}
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Drop-off Date</label>
          <input
            type="date"
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button onClick={handleSearch} style={buttonStyle}>Search</button>
      </div>
    </div>
  );
};

// **Styles**
const wrapperStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "50px",
};

const containerStyle = {
  width: "100%",
  maxWidth: "600px",
  border: "2px solid orange",
  borderRadius: "10px",
  padding: "10px",
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  justifyContent: "space-between",
  backgroundColor: "#fff8e1",
};

/* Input container (location & date) */
const inputContainerStyle = {
  display: "flex",
  flexDirection: "column",
  flex: "1",
  minWidth: "140px",
};

/* Label above the input */
const labelStyle = {
  fontSize: "14px",
  color: "black",
  marginBottom: "4px",
};

/* Search input with icon */
const searchContainerStyle = {
  display: "flex",
  alignItems: "center",
  border: "1px solid gray",
  borderRadius: "5px",
  padding: "10px",
  backgroundColor: "white",
};

const searchIconStyle = {
  marginRight: "10px",
  color: "gray",
};

const inputWithIconStyle = {
  border: "none",
  outline: "none",
  width: "100%",
  fontSize: "15px",
  background: "transparent",
  marginLeft: "-5px",
};

/* General Input Styles */
const inputStyle = {
  padding: "8px",
  border: "1px solid gray",
  borderRadius: "5px",
  fontSize: "16px",
};

/* Search Button */
const buttonStyle = {
  backgroundColor: "#228B22",
  color: "white",
  borderRadius: "5px",
  width: "100%",
  height: "45px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background-color 0.3s",
};

buttonStyle[":hover"] = {
  backgroundColor: "#1c6e1c",
};

export default SearchBox;
