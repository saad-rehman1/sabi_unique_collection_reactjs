import axios from "axios";

const BASE_URL = "https://www.backend.sabiuniquecollection.com/api";

// Forgot Password API
export const sendForgotPasswordOTP = async (email) => {
  const response = await axios.post(`${BASE_URL}/users/forgot-password`, {
    email,
  });
  return response.data;
};
