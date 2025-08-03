import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendForgotPasswordOTP } from "../Services/EndPoint/forgotapi"; // ✅ import the endpoint

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ email }) => {
    try {
      const data = await sendForgotPasswordOTP(email); // ✅ use endpoint

      if (data?.success) {
        toast.success(data.message || "OTP sent to your email!");
        localStorage.setItem("otpToken", data.data.token);
        navigate("/otp-verification", {
          state: { token: data.data.token, email },
        });
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-pink-200 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-pink-700 mb-6 text-center">
          Forgot Password
        </h2>

        <label className="block mb-2 text-gray-600 font-medium">Email</label>
        <input
          type="email"
          placeholder="Enter your email address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition duration-300"
        >
          {isSubmitting ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
