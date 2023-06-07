import axios from "axios";

const PORT = 8000;

export const getAllHousing = async () => {
  const {data}  = await axios.get(`http://localhost:${PORT}/API/housing`);
  console.log("Data en getAllHousing:", data);
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
  const { data } = await axios.post(`http://localhost:${PORT}`, body);
  return data;
}

export const permanentDelete = async (_id) => {
  const { data } = await axios.delete(`http://localhost:${PORT}/${_id}`);
  return data;
}

export const login = async (body) => {
  const { data } = await axios.post(`http://localhost:${PORT}/users/login`, body);
  return data;
}

export const register = async (body) => {
  const { data } = await axios.post(`http://localhost:${PORT}/users/register`, body);
  return data;
}