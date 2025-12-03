import axios from "axios";
const API_URL = "http://localhost:5000";

export async function getPublishedEvents() {
  const res = await axios.get(`${API_URL}/events`);
  return res.data;
}

export async function getEventById(id) {
  const res = await axios.get(`${API_URL}/events/${id}`);
  return res.data;
}

export async function registerToEvent(id, token) {
  const res = await axios.post(
    `${API_URL}/events/${id}/register`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function unregisterFromEvent(id, token) {
  const res = await axios.delete(`${API_URL}/events/${id}/register`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function getMyRegistrations(token) {
  const res = await axios.get(`${API_URL}/events/me/registrations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
