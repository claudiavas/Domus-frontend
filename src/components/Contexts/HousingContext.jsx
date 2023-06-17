import React, { createContext, useState, useEffect } from 'react';
import { getAllHousing } from '../apiService/apiService';

export const HousingContext = createContext();

export const HousingProvider = ({ children }) => {
    const [housing, setHousing] = useState([]);

  const fetchHousing = async () => {
    try {
      const data = await getAllHousing();
      setHousing(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHousing();
  }, []);
    

  const contextValue = {
    housing,
  };

  return (
    <HousingContext.Provider value={contextValue}>
      {children}
    </HousingContext.Provider>
  );
};