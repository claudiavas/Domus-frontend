import React, { createContext, useState, useEffect } from 'react';
import { getActiveHousing } from '../apiService/apiService';

export const HousingContext = createContext();

export const HousingProvider = ({ children }) => {
    const [housing, setHousing] = useState([]);
    //const [isLoading, setIsLoading] = useState(true); // Variable de estado para indicar si los datos están cargando

  const fetchHousing = async () => {
    try {
      const data = await getActiveHousing();
      setHousing(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchHousing();
  }, []);
  
  

  const contextValue = {
    housing,
    setHousing
  };

  return (
    <HousingContext.Provider value={contextValue}>
     {children}
    </HousingContext.Provider>
  );
};

      // {isLoading ? ( // Mostrar "Cargando..." mientras los datos se están cargando
      // <div>Cargando...</div>
      // ) : (
      // children // Renderizar los componentes hijos una vez que los datos se hayan cargado
      // )}