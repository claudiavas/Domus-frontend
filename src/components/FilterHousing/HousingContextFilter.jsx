import React, { createContext, useState } from 'react';

const HousingContext = createContext();

export function InmueblesProvider({ children }) {
  const [room, setRoom] = useState('');
  const [baths, setBaths] = useState('');
  const [meter, setMeter] = useState(60); // valor por defecto 60
  const [garage, setGarage] = useState ('');
  const [minPrice, setMinPrice] = useState ('');
  const [maxPrice, setMaxPrice] = useState (500000); //valor por defecto 500000
  const [checkbox, setCheckbox] = useState({
    closet: false,
    air_condicioned: false,
    heating: false,
    elevator: false,
    outside_view: false,
    garden: false,
    pool: false,
    terrace: false,
    storage: false,
    accessible: false,
  });

  return (
    <HousingContext.Provider value={{ room, setRoom, baths, setBaths, meter, setMeter, garage, setGarage, minPrice, setMinPrice, maxPrice, setMaxPrice, checkbox, setCheckbox }}>
      {children}
    </HousingContext.Provider>
  );
}

export default HousingContext;

