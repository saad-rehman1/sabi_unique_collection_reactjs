// src/pages/Dashboard/Account.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Account() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  // Simulate API fetch with dummy data
  const fetchUserData = () => {
    setTimeout(() => {
      const dummy = {
        name: "Saad Rehman",
        email: "saad@example.com",
      };
      setUserData(dummy);
      reset(dummy);
    }, 500); // Simulate delay
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onSubmit = async (data) => {
    try {
      // Simulate API update
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate success or failure
      const success = true; // change to `false` to simulate error

      if (success) {
        toast.success("Profile updated successfully");
        setEditMode(false);
        setUserData(data);
      } else {
        throw new Error("Simulated failure");
      }
    } catch (error) {
      toast.error("Update failed. Please try again.");
    }
  };

  if (!userData) return <p>Loading your account info...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-pink-700 mb-6">👤 Account Information</h2>

      {!editMode ? (
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>

          <button
            onClick={() => setEditMode(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg text-sm"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              {...register("name", { required: true })}
              className="w-full border border-gray-300 rounded-lg p-2"
              type="text"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", { required: true })}
              className="w-full border border-gray-300 rounded-lg p-2"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex gap-3">
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-pink-600 hover:bg-pink-800 text-white py-2 px-4 rounded-lg text-sm"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                reset(userData);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
