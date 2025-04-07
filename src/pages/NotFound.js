import React from 'react'
import Nav from '../Components/nav';
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
        <Nav></Nav>
        <div style={{ minHeight: "75vh", backgroundColor: "#f9fafb", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center", textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontSize: "6rem", fontWeight: "bold", color: "#1e3a8a", marginBottom: "1rem" }}>404</h1>
          <p style={{ fontSize: "1.5rem", color: "#4b5563", marginBottom: "2rem" }}>Oops! The page you’re looking for doesn’t exist.</p>
          <Link to="/" style={{ backgroundColor: "#3b82f6", color: "white", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "500", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", transition: "all 0.2s ease-in-out" }} onMouseOver={e => e.currentTarget.style.backgroundColor = "#2563eb"} onMouseOut={e => e.currentTarget.style.backgroundColor = "#3b82f6"}>Go back home</Link>
        </div>
    </div>
  )
}

export default NotFound
