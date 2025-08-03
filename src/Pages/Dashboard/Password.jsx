import React from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUnlockAlt, FaRedoAlt } from "react-icons/fa";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    console.log("Submitted Data:", data);

    // Simulate API call
    await new Promise((res) => setTimeout(res, 1000));

    alert("✅ Password updated successfully (simulation).");
    reset();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-pink-700 flex items-center gap-2">
        <FaRedoAlt /> Change Password
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Old Password */}
        <div>
          <label className="block text-pink-600 font-semibold mb-1 flex items-center gap-2">
            <FaLock /> Old Password
          </label>
          <input
            type="password"
            placeholder="Enter your old password"
            {...register("oldPassword", { required: "Old password is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {errors.oldPassword && (
            <p className="text-sm text-red-500">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-pink-600 font-semibold mb-1 flex items-center gap-2">
            <FaUnlockAlt /> New Password
          </label>
          <input
            type="password"
            placeholder="Enter your new password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {errors.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-pink-600 font-semibold mb-1 flex items-center gap-2">
            <FaUnlockAlt /> Confirm New Password
          </label>
          <input
            type="password"
            placeholder="Re-enter new password"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-800 font-semibold transition"
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
