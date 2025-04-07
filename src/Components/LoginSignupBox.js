import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from './auth';
import { useNavigate } from 'react-router-dom';


export default function LoginSignupBox(){
  const navigate = useNavigate();
  const auth = useAuth();

  const [action, setAction] = useState("SignUp");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");  
  const [showPassword, setShowPassword] = useState(false); 

  // Handles Registration
  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userName }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Registration Successful!");
        setAction('Login');
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration: ", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        // If login is successful, save token to localStorage and update the context
        console.log("Login successful", data);

        // When logged in with user data and token it will be saved in the local Storage
        auth.login({ email, userName: data.userName }, data.token);

        alert("Login successful!");
        navigate('/', { replace: true });
      } else {
        alert(data.error || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  

  const handleSubmit = async () => {
    if (action === "SignUp") {
      handleRegistration();
    } else {
      handleLogin();
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <div style={{ padding: "20px", width: "400px", borderRadius: "10px", backgroundColor: "white", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
        
        <h1 style={{ color: "rgb(24, 121, 202)", marginBottom: "10px" }}>{action}</h1>

        {action === "SignUp" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
            <label>User Name</label>
            <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="User Name" style={{ padding: "8px", border: "1px solid gray", borderRadius: "4px", width: "95%" }} />
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
          <label>Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" style={{ padding: "8px", border: "1px solid gray", borderRadius: "4px", width: "95%" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
          <label>Password:</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Enter your password" style={{ padding: "8px", border: "1px solid gray", borderRadius: "4px", width: "95%" }} />
        </div>

        {action === "SignUp" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
            <label>Confirm Password:</label>
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Confirm your password" style={{ padding: "8px", border: "1px solid gray", borderRadius: "4px", width: "95%" }} />
          </div>
        )}

        <p>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", justifyContent: "center" }}>
            <span>
              {action === "SignUp" ? "Already have an account?" : "Don't have an account?"} 
              <span 
                style={{ color: "rgb(24, 121, 202)", cursor: "pointer", marginLeft: "5px" }} 
                onClick={() => {setAction(action === "SignUp" ? "Login" : "SignUp"); 
                                 setUserName(""); setEmail(""); setPassword(""); setConfirmPassword("");}}
              >
                {action === "SignUp" ? "Login here" : "Sign up here"}
              </span>
            </span>
        
            <span style={{ cursor: "pointer" }}>
              {showPassword ? 
                <FaEye onClick={() => setShowPassword(false)} /> 
                : 
                <FaEyeSlash onClick={() => setShowPassword(true)} />
              }
            </span>
          </div>
        </p>
         
        <button 
          style={{ padding: "10px 20px", backgroundColor: "rgb(24, 121, 202)", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", width: "100%", fontSize: "16px" }}
          onClick={handleSubmit}
        >
          {action}
        </button>
      </div>
    </div>
   );
} 
