import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(false);
  const [checking, setChecking] = useState(true);

  // Verificar si el usuario tiene un token en el localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("token en AuthContext:", token);
    setLoginState(true);
  }, []);
  
  useEffect(() => {
    console.log("loginState en AuthContext:", loginState);
  }, [loginState]);
  
  useEffect(() => {
    setChecking(false);
  }, []);


  const contextValue = {
    loginState,
    setLoginState,
    checking,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};


