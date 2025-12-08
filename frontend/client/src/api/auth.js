import axios from "axios";
const API_URL = "http://localhost:5000";

export async function registerUser(formData) {
  const res = await axios.post(`${API_URL}/auth/register`, formData);
  return res.data;
}

export async function loginUser(credentials) {
  const res = await axios.post(`${API_URL}/auth/login`, credentials);
  return res.data;
}

