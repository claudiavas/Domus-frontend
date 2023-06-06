import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Verificar si el usuario tiene un token en el localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setLoginState(true);
    }
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


