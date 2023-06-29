import React, { createContext, useState } from 'react';

const HousingContext = createContext();

export function InmueblesProvider({ children }) {
  const [room, setRoom] = useState('');

  return (
    <HousingContext.Provider value={{ room, setRoom }}>
      {children}
    </HousingContext.Provider>
  );
}

export default HousingContext;

