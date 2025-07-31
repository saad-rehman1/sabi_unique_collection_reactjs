import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthenticationStor"; // ⬅️ Assuming this is your Zustand auth store

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser); // Zustand action to set user

  const onSubmit = async (formData) => {
    try {
      // 1. Register the user
      await axios.post(
        "https://www.backend.sabiuniquecollection.com/api/users/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("Registered successfully!");

      // 2. Login to get token
      const loginRes = await axios.post(
        "https://www.backend.sabiuniquecollection.com/api/users/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = loginRes.data.data.token;
      localStorage.setItem("token", token);

      // 3. Get user profile with token
      const profileRes = await axios.get(
        "https://www.backend.sabiuniquecollection.com/api/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = profileRes.data.data;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user); // ⬅️ Set user in Zustand store

      // 4. Navigate to home
      navigate("/");
    } catch (error) {
      console.error("Register/Login error:", error);
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <div className="flex items-center gap-2 justify-center mb-6">
          <FaUserPlus className="text-pink-700 text-3xl" />
          <h2 className="text-2xl font-bold text-pink-700 tracking-wide">Create Account</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-pink-500"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-pink-500"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-pink-500"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-700 text-white py-2 rounded-lg hover:bg-pink-800 transition"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-pink-700 font-semibold hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}
