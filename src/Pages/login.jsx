import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthenticationStor";
import { loginUser } from "../Services/EndPoint/loginapi";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (formData) => {
    try {
      const data = await loginUser(formData);
      const user = data?.data;

      setUser(user);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Invalid email or password";
      toast.error(msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <div className="flex items-center gap-2 justify-center mb-6">
          <FaSignInAlt className="text-pink-700 text-3xl" />
          <h2 className="text-2xl font-bold text-pink-700 tracking-wide">Login</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-pink-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-pink-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-700 text-white py-2 rounded-lg hover:bg-pink-800 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-pink-700 font-semibold hover:underline"
          >
            Register here
          </button>
        </p>

        <p
          className="text-right text-sm text-pink-700 hover:underline cursor-pointer mt-2"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>
      </div>
    </div>
  );
}
