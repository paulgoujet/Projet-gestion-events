import axios from "axios";
const API_URL = "http://localhost:5000";

export async function getAllEventsAdmin(token) {
  const res = await axios.get(`${API_URL}/events/admin/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function deleteEventAdmin(id, token) {
  const res = await axios.delete(`${API_URL}/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function updateEventAdmin(id, updatedData, token) {
  const res = await axios.put(`${API_URL}/events/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function createEventAdmin(data, token) {
  const res = await axios.post(`${API_URL}/events`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function updateEventStatus(id, status, token) {
  const res = await axios.put(
    `${API_URL}/events/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}