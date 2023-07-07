import React, { createContext, useState } from 'react';

const HousingContext = createContext();

export function InmueblesProvider({ children }) {
  const [room, setRoom] = useState('');
  const [baths, setBaths] = useState('');
  const [meter, setMeter] = useState(60);
  const [garage, setGarage] = useState ('');
  const [minPrice, setminPrice] = useState ('');
  const [maxPrice, setmaxPrice] = useState ('');

  return (
    <HousingContext.Provider value={{ room, setRoom, baths, setBaths, meter, setMeter, garage, setGarage, minPrice, setminPrice, maxPrice, setmaxPrice }}>
      {children}
    </HousingContext.Provider>
  );
}

export default HousingContext;

