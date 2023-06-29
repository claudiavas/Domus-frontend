import React, { createContext, useState } from 'react';

const HousingContext = createContext();

export function InmueblesProvider({ children }) {
  const [room, setRoom] = useState('');
  const [baths, setBaths] = useState('');
  return (
    <HousingContext.Provider value={{ room, setRoom, baths, setBaths }}>
      {children}
    </HousingContext.Provider>
  );
}

export default HousingContext;

