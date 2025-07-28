// src/pages/ResetPassword.jsx
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const token = localStorage.getItem("verifiedToken");

  const onSubmit = async ({ password }) => {
    try {
      const { data } = await axios.post(
        "https://www.backend.sabiuniquecollection.com/api/users/reset-password",
        { password, token }
      );

      toast.success("Password reset successful!");
      localStorage.removeItem("verifiedToken");
      navigate("/login");
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(
        error?.response?.data?.message || "Reset password failed or link expired"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="flex items-center gap-2 justify-center mb-6">
          <FaLock className="text-pink-700 text-3xl" />
          <h2 className="text-2xl font-bold text-pink-700 tracking-wide">Reset Password</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-pink-500"
              placeholder="Enter new password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-pink-500"
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-700 text-white py-2 rounded-lg hover:bg-pink-800 transition"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
