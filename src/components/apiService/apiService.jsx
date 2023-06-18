import axios from "axios";

const PORT = 8000;

export const getAllHousing = async () => {
  const {data}  = await axios.get(`http://localhost:${PORT}/API/housing`);
  return data;
}

export const updateHousing = async (_id, body) => {
  const { data } = await axios.put(`http://localhost:${PORT}/${_id}`, body);
  return data;
}


export const deleteHousing = async (_id, body) => {
  const { data } = await axios.put(`http://localhost:${PORT}/${_id}`, body);
  return data;
}

export const addHousing = async (body) => {
  const { data } = await axios.post(`http://localhost:${PORT}/API/housing`, body);
  return data;
}

export const permanentDelete = async (_id) => {
  const { data } = await axios.delete(`http://localhost:${PORT}/${_id}`);
  return data;
}

export const login = async (body) => {
  const { data } = await axios.post(`http://localhost:${PORT}/user/login`, body);
  return data;
}

export const register = async (body) => {
  const { data } = await axios.post(`http://localhost:${PORT}/user/register`, body);
  return data;
}

export const getCommunities = async () => { 
  const { data } = await axios.get('https://apiv1.geoapi.es/comunidades?type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0');
  return data;
} 
 
export const getProvinces = async () => { 
  const { data } = await axios.get('https://apiv1.geoapi.es/provincias?type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0'); 
  return data;
}