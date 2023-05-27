import axios from "axios";


export const getAllHousing = async () => {
  const { data } = await axios.get("http://localhost:8000/API/housing");
  console.log("Datos obtenidos:", data);
  return data;
}

export const updateHousing = async (_id, body) => {
  const { data } = await axios.put(`http://localhost:8000/API/housing/${_id}`, body);
  return data;
}


export const deleteHousing = async (_id, body) => {
  const { data } = await axios.put(`http://localhost:8000/API/housing/${_id}`, body);
  return data;
}

export const addHousing = async (body) => {
  const { data } = await axios.post(`http://localhost:8000/API/housing/`, body);
  return data;
}

export const permanentDelete = async (_id) => {
  const { data } = await axios.delete(`http://localhost:8000/API/Housing/${_id}`);
  return data;
}
