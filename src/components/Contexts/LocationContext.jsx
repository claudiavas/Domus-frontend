import React, { createContext, useState, useEffect } from 'react';
import { getCommunities, getProvinces } from '../apiService/apiService';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [communities, setCommunities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Variable de estado para indicar si los datos están cargando

  const fetchProvinces = async () => {
    try {
      const data = await getProvinces();
      setProvinces(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCommunities = async () => {
    try {
      const data = await getCommunities();
      setCommunities(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchProvinces(), fetchCommunities()]);
      setIsLoading(false); // Los datos han terminado de cargarse
    };

    fetchData();
  }, []);

  const contextValue = {
    provinces,
    communities,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {isLoading ? ( // Mostrar "Cargando..." mientras los datos se están cargando
        <div>Cargando...</div>
      ) : (
        children // Renderizar los componentes hijos una vez que los datos se hayan cargado
      )}
    </LocationContext.Provider>
  );
};