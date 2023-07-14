import axios from "axios";

const PORT = 8000;
const BackendUrl = "https://verde-backend-production.up.railway.app/";

//HOUSING

export const getActiveHousing = async () => {
  const {data}  = await axios.get(`${BackendUrl}/api/housing/?status=active`);
  return data;
}

export const getHouse = async (_id) => {
  const {data}  = await axios.get(`${BackendUrl}/api/housing/${_id}`);
  return data;
}

export const updateHousing = async (_id, body) => {
  const { data } = await axios.put(`${BackendUrl}/api/housing/${_id}`, body);
  return data;
}


export const deleteHousing = async (_id, body) => {
  const { data } = await axios.put(`${BackendUrl}/api/housing/${_id}`, body);
  return data;
}

export const addHousing = async (body) => {
  const { data } = await axios.post(`${BackendUrl}/api/housing`, body);
  return data;
}

//USER

export const login = async (body) => {
  const { data } = await axios.post(`${BackendUrl}/user/login`, body);
  return data;
}

export const register = async (body) => {
  const { data } = await axios.post(`${BackendUrl}/user/register`, body);
  return data;
}

export const resetPassword = async (_id, body) => {
  const { data } = await axios.put(`${BackendUrl}/user/resetpassword/${_id}`, body);
  return data;
};

export const findUserByEmail = async (email) => {
  console.log("ejecutando findUserByEmail")
  const encodedEmail = encodeURIComponent(email); // reemplaza el @ por %40
  const { data } = await axios.get(`${BackendUrl}/user?email=${encodedEmail}`);
  console.log(data);
  return data;
}

export const updateUser = async (_id, body) => {
  const {data} = await axios.put(`${BackendUrl}/user/${_id}`, body);
  return data;
  }

export const getPayload = async (token) => {
  const {data} = await axios.get(`${BackendUrl}/user/me`, {headers: {Authorization: `Bearer ${token}`}});
  return data;
  }
  
export const getProfile = async (_id) => {
  const {data} = await axios.get(`${BackendUrl}/user/${_id}`);
  return data;
  }


// REQUEST
export const getActiveRequest = async () => {
  const {data} = await axios.get(`${BackendUrl}/api/request`);
  return data;
} 

//GEOAPI

export const getCommunities = async () => { 
  const { data } = await axios.get('https://apiv1.geoapi.es/comunidades?type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0');
  return data;
} 

export const getProvinces = async () => { 
  const { data } = await axios.get('https://apiv1.geoapi.es/provincias?type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0'); 
  return data;
}

// SENDEMAIL

export const sendPasswordResetEmail = async (body) => {
  console.log("ejecutando sendPasswordResetEmail")
  const {data} = await axios.post(`${BackendUrl}/api/sendemail`, body);
  console.log(data);
  return data;
}