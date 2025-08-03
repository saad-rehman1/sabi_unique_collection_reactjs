// src/Services/EndPoint/auth.js
import axios from "axios";

const BASE_URL = "https://www.backend.sabiuniquecollection.com/api/users";

export const registerUser = async (formData) => {
  return await axios.post(`${BASE_URL}/register`, formData, {
    headers: { "Content-Type": "application/json" },
  });
};

export const loginUser = async ({ email, password }) => {
  return await axios.post(
    `${BASE_URL}/login`,
    { email, password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const fetchUserProfile = async (token) => {
  return await axios.get(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
