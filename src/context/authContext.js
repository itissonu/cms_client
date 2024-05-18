// AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserRole, isLoggedIn } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  
  const [isLogged, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const authStatus = isLoggedIn();
      if (authStatus) {
        setIsLoggedIn(true);
        const userRole = await getUserRole();
        setRole(userRole);
      } else {

        setIsLoggedIn(false);
        setRole(null);

      }
    };

    initializeAuth();
  }, []);

 const login = async () => {
    setIsLoggedIn(true);
    const userRole = await getUserRole();
    setRole(userRole);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout,role }}>
      {children}
    </AuthContext.Provider>
  );
};
