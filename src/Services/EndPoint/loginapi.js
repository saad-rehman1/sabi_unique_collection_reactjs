import axios from "axios";

export const loginUser = async (formData) => {
  const response = await axios.post(
    "https://www.backend.sabiuniquecollection.com/api/users/login",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
