import axios from "axios";


export const getAllHouses = async () => {
  const { data } = await axios.get("http://localhost:8000/API/housing");
  return data;
}

export const updateHouse = async (_id, body) => {
  const { data } = await axios.put(`http://localhost:8000/API/housing/${_id}`, body);
  return data;
}


export const deleteHouse = async (_id, body) => {
  const { data } = await axios.put(`http://localhost:8000/API/housing/${_id}`, body);
  return data;
}

export const addHouse = async (body) => {
  const { data } = await axios.post(`http://localhost:8000/API/housing/`, body);
  return data;
}

export const permanentDelete = async (_id) => {
  const { data } = await axios.delete(`http://localhost:8000/API/Housing/${_id}`);
  return data;
}
