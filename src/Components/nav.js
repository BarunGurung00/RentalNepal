import React from 'react'
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";
import { FaCar } from "react-icons/fa";
import { MdOutlineSell } from "react-icons/md";
import { TbBuildingAirport } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { useAuth } from './auth';
import { MdOutlineVerified } from "react-icons/md";

const Nav = () => {  // ✅ Change "nav" to "Nav"
    const auth = useAuth();
    
    return (
      <div >
        {/* Header Section */}
        <header style={{ backgroundColor: "rgb(24, 121, 202)", padding: "10px", position: "relative"}}>
          <div style={{maxWidth: "1300px", margin: "auto" }}>
            {/* Upper section of header with logo and signin */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "5px", justifyContent: "center", alignItems: "center", padding: "0px" }}>
                <div>
                  <TiThMenu size={18} style={{ color: 'white' }} />
                </div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "rgb(255, 255, 255)" }}>
                  AutoRental
                </div>
              </div>
            
              <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                 { !auth.user && (
                   <div style={{ fontWeight: "bold" }}>
                     <Link to="/Signin" style={{ textDecoration: "none", color: "white", marginLeft: "10px" }}>SignUp /</Link>
                   </div>
                )}
                   <div>
                     <Link to="/Profile" style={{ textDecoration: "none"}}>
                        {auth.user ? ( 
                          <div style={{ display: "flex", flexDirection: "column", alignItems:"center", gap:"5px" }}>
                               <div style={{display: "flex", gap: "10px", justifyContent: "center", width:"30px",height:"30px" , alignItems: "center",color:"white", border:"1px solid white", borderRadius:"15px"}}>{auth.user.email?.charAt(0).toUpperCase()}</div>
                               <span style={{color:"white", fontSize:"14px" }}>Profile</span>
                          </div>
                           ) : <div style={{ display: "flex", flexDirection: "column", alignItems:"center", gap:"5px" }}>
                                 <CgProfile size={23} style={{ backgroundColor: "white", borderRadius: "10px" }} />
                                 <span style={{color:"white", fontSize:"14px" }}>Profile</span>
                               </div>
                          }      
                     </Link>
                   </div>
              </div>
            </div>
  
            {/* Lower section of the header with options */}
            <div style={{ display: "flex", justifyContent: "start", gap: "20px", padding: "10px", color: "white" }}>
              <div style={{ display: "flex", gap: "5px", justifyContent: "center", alignItems: "center" }}>
                <FaCar />
                <p>Car Rentals</p>
              </div>
              <div style={{ display: "flex", gap: "5px", justifyContent: "center", alignItems: "center" }}>
                <MdOutlineSell />
                <p>Car Sales</p>
              </div>
              <div style={{ display: "flex", gap: "5px", justifyContent: "center", alignItems: "center" }}>
                <TbBuildingAirport />
                <p>Airport taxis</p>
              </div>
              <div style={{ display: "flex", gap: "5px", justifyContent: "center", alignItems: "center" }}>
                <MdOutlineVerified />  
                <p>Verified Hosts</p>
              </div>
            </div>
          </div>
        </header>
      </div>
    )
  }
  
  export default Nav; // ✅ Also update the export
  

