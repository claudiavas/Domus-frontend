import React, { createContext, useState } from 'react';

const HousingContextFilter = createContext();

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
  const [province, setProvince] = useState();
  const [municipality, setMunicipality] = useState();
  const [neighborhood, setNeighborhood] = useState();
  const [population, setPopulation] = useState();

  return (
    <HousingContextFilter.Provider value={{ room, setRoom, baths, setBaths, meter, setMeter, garage, setGarage, minPrice, setMinPrice, maxPrice, setMaxPrice, checkbox, setCheckbox, province, setProvince, municipality, setMunicipality, neighborhood, setNeighborhood, population, setPopulation  }}>
      {children}
    </HousingContextFilter.Provider>
  );
}

export default HousingContextFilter;

