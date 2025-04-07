import React, { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
  
    if(storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken && !storedUser) { // Check if there's token and user, and the user is not already set
      fetch('http://localhost:4000/user', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${storedToken}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setUser(data.user);  // Set the user data only if it's valid
            localStorage.setItem('user', JSON.stringify(data.user));  // Update localStorage
          } else {
            console.error("Invalid token: ", data.message);
            localStorage.removeItem('token');  // Remove token if invalid
          }
        });
    }
  }, []);  // <-- This runs only once when the component mounts
  
  

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
