import React, { createContext, useContext, useState, useEffect } from 'react';
import { getActiveHousing, updateHousing } from '../apiService/apiService';

export const HousingContext = createContext();

export const HousingProvider = ({ children }) => {
    const [housing, setHousing] = useState({});
    const [isLoading, setIsLoading] = useState(true); // Variable de estado para indicar si los datos están cargando

    const fetchHousing = async () => {
      try {
        const data = await getActiveHousing();
        setHousing(data);
        setIsLoading(false); // Cambiar el estado a "false" una vez que los datos se hayan cargado
      } catch (error) {
        console.error(error);
        setIsLoading(false); // En caso de error, también cambiar el estado a "false"
      }
    }

  useEffect(() => {
    fetchHousing();
  }, [housing]);  

  useEffect(() => {
    console.log("housing", housing)
  }, [housing]);
  
  

  const contextValue = {
    housing,
    setHousing,
  };

  return (
    <HousingContext.Provider value={contextValue}>
      {isLoading ? (
        <div>Cargando...</div> // Mostrar "Cargando..." mientras los datos se están cargando
      ) : (
      children // Renderizar los componentes hijos una vez que los datos se hayan cargado
      )}
    </HousingContext.Provider>
  );
};