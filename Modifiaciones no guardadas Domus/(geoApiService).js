(geoApiService)
import axios from 'axios';

export const getCommunities = async () => { 
    const { data } = await axios.get('https://apiv1.geoapi.es/comunidades?type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0');
    return data;
  } 
  
export const getProvinces = async () => { 
    const { data } = await axios.get('https://apiv1.geoapi.es/provincias?type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0'); 
    return data;
  }

export const getMunicipalities = async (selectedProvince) => {
    const { data } = await axios.get(`https://apiv1.geoapi.es/municipios?CPRO=${selectedProvince}&type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0`);
    return data;
  }

 export const getPopulations = async (selectedProvince, selectedMunicipality) => {
    const { data } = await axios.get(`https://apiv1.geoapi.es/poblaciones?CPRO=${selectedProvince}&CMUM=${selectedMunicipality}&type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0`);
    return data;
  };

  export const getNeighborhoods = async (selectedProvince, selectedMunicipality, selectedPopulation) => {
    const encodedNENTS150 = selectedPopulation.replace(/\s/g, '%20');
    const { data } = await axios.get(`https://apiv1.geoapi.es/nucleos?CPRO=${selectedProvince}&CMUM=${selectedMunicipality}&NENTSI50=${encodedNENTS150}&type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0`);
    return data;
  };

  export const getZipCodes = async (selectedProvince, selectedMunicipality, selectedNeighborhood) => {
    const { data } = await axios.get(`https://apiv1.geoapi.es/cps?CPRO=${selectedProvince}&CMUM=${selectedMunicipality}&CUN=${selectedNeighborhood}&type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0`);
    return data;
  };

  export const getRoads = async (selectedProvince, selectedMunicipality, selectedNeighborhood, selectedZipCode) => {
    const { data } = await axios.get(`https://apiv1.geoapi.es/calles?CPRO=${selectedProvince}&CMUM=${selectedMunicipality}&CUN=${selectedNeighborhood}&CPOS=${selectedZipCode}&type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0`);
    return data;
  };