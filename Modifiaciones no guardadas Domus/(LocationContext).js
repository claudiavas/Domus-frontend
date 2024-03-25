(LocationContext)
import React, { createContext, useState, useEffect } from 'react';
import { getCommunities, getProvinces, getMunicipalities, getPopulations, getNeighborhoods, 
  getZipCodes, getRoads } from '../apiService/geoApiService';
import { findItemNameByCode } from '../apiService/internalFunctions'
import { removeTextInParentheses } from '../apiService/internalFunctions'
import { AddHousing } from '../MainView/AddHousing/AddHousing';
import { UpdateHousing } from '../MainView/HousingDetails/UpdateHousing';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true); // Variable de estado para indicar si los datos están cargando

  const [communities, setCommunities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [populations, setPopulations] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);
  const [roads, setRoads] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedMunicipality, setSelectedMunicipality] = useState();
  const [selectedPopulation, setSelectedPopulation] = useState();
  const [selectedNeighborhood, setSelectedNeighborhood] = useState();
  const [selectedZipCode, setSelectedZipCode] = useState();
  const [selectedRoad, setSelectedRoad] = useState();

  const [selectedProvinceName, setSelectedProvinceName] = useState();
  const [selectedMunicipalityName, setSelectedMunicipalityName] = useState();
  const [selectedPopulationName, setSelectedPopulationName] = useState();
  const [selectedNeighborhoodName, setSelectedNeighborhoodName] = useState();
  const [selectedZipCodeName, setSelectedZipCodeName] = useState();
  const [selectedRoadName, setSelectedRoadName] = useState();

  const [locationText, setLocationText] = useState();



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

  const fetchMunicipalities = async () => {
    try {
      const { data } = await getMunicipalities(selectedProvince);
      setMunicipalities(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPopulations = async () => {
    try {
      const { data } = await getPopulations(selectedProvince, selectedMunicipality);
      setPopulations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNeighborhoods = async () => {
    try {
      const { data } = await getNeighborhoods(selectedProvince, selectedMunicipality, selectedPopulation);
      setNeighborhoods(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchZipCodes = async () => {
    try {
      const { data } = await getZipCodes(selectedProvince, selectedMunicipality, selectedNeighborhood);
      setZipCodes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRoads = async ( ) => {
    try {
      const { data } = await getRoads(selectedProvince, selectedMunicipality, selectedNeighborhood, selectedZipCode);
      setRoads(data);
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

  useEffect(() => {
    if (selectedProvince) {
      console.log("selectedProvince: ", selectedProvince);
      fetchMunicipalities();
      const provinceName = findItemNameByCode(provinces, selectedProvince, "PRO");
      setSelectedProvinceName(provinceName);
  }}, [selectedProvince]);

  useEffect(() => {
    if (selectedMunicipality) {
      fetchPopulations();
      const municipalityName = findItemNameByCode(municipalities, selectedMunicipality, "CMUM");
      setSelectedMunicipalityName(municipalityName);
    }
  }, [selectedMunicipality]);

  useEffect(() => {
    if (selectedPopulation) {
      fetchNeighborhoods();
      const populationName = findItemNameByCode(populations, selectedPopulation, "NENTSI50");
      setSelectedPopulationName(populationName);
    }
  }, [selectedPopulation]);

  useEffect(() => {
    if (selectedNeighborhood) {
      fetchZipCodes();
      const neighborhoodName = findItemNameByCode(neighborhoods, selectedNeighborhood, "CUN");
      setSelectedNeighborhoodName(neighborhoodName);
    }
  }, [selectedNeighborhood]);

  useEffect(() => {
    if (selectedZipCode) {
      fetchRoads();
      const zipCodeName = findItemNameByCode(zipCodes, selectedZipCode, "CPOS");
      setSelectedZipCodeName(zipCodeName);
    }
  }, [selectedZipCode]);

  
  useEffect(() => {
    const location = [
      selectedProvinceName&&selectedProvinceName,
      selectedMunicipalityName&&selectedMunicipalityName,
      selectedPopulationName&&selectedPopulationName,
      selectedNeighborhoodName&&selectedNeighborhoodName,
    ]
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(removeTextInParentheses)
      .join(", ");
    setLocationText(location);
  }, [selectedProvinceName, selectedMunicipalityName, selectedPopulationName, selectedNeighborhoodName]);

useEffect(() => {
  setMunicipalities([])
  setPopulations([])
  setNeighborhoods([])
  setZipCodes([])
  setRoads([])
  setSelectedProvince()
  setSelectedMunicipality()
  setSelectedPopulation()
  setSelectedNeighborhood()
  setSelectedZipCode()
  setSelectedRoad()
  setSelectedProvinceName()
  setSelectedMunicipalityName()
  setSelectedPopulationName()
  setSelectedNeighborhoodName()
  setSelectedZipCodeName()
  setSelectedRoadName()
}, [UpdateHousing])




  const contextValue = {
    provinces,
    communities,
    municipalities,
    populations,
    neighborhoods,
    zipCodes,
    roads,
    setProvinces,
    setCommunities,
    setMunicipalities,
    setPopulations,
    setNeighborhoods,
    setZipCodes,
    setRoads,    
    selectedProvince,
    selectedMunicipality,
    selectedPopulation,
    selectedNeighborhood,
    selectedZipCode,
    selectedRoad,
    setSelectedProvince,
    setSelectedMunicipality,
    setSelectedPopulation,
    setSelectedNeighborhood,
    setSelectedZipCode,
    setSelectedRoad,
    selectedProvinceName,
    selectedMunicipalityName,
    selectedPopulationName,
    selectedNeighborhoodName,
    selectedZipCodeName,
    selectedRoadName,
    setSelectedProvinceName,
    setSelectedMunicipalityName,
    setSelectedPopulationName,
    setSelectedNeighborhoodName,
    setSelectedZipCodeName,
    setSelectedRoadName,
    locationText,
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