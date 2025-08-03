import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaUserEdit,
} from "react-icons/fa";

export default function Profile() {
  const [userData, setUserData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  // Simulated API fetch
  const fetchUserData = () => {
    setTimeout(() => {
      const dummy = {
        name: "Saad Rehman",
        email: "saad@example.com",
        phone: "+92 300 1234567",
      };
      setUserData(dummy);
      reset(dummy);
    }, 300);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onSubmit = async (data) => {
    try {
      await new Promise((res) => setTimeout(res, 800));
      toast.success("Profile updated successfully!");
      setUserData(data);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (!userData)
    return <p className="text-center mt-10 text-lg text-gray-500">Loading your profile...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-2">
        <FaUserEdit className="text-pink-600" />
        Profile Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FaUser className="text-gray-500" />
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            type="text"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FaEnvelope className="text-gray-500" />
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FaPhoneAlt className="text-gray-500" />
            Phone
          </label>
          <input
            {...register("phone", {
              required: "Phone is required",
              minLength: 10,
            })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            type="tel"
            placeholder="+92 300 1234567"
          />
        </div>

        {/* Save button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
