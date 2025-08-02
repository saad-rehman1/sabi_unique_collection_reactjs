import React from "react";
import { useForm } from "react-hook-form";
import { FaHeadset, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function HelpSupport() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Support Form Data:", data);
    // You can send this to your backend API here
    reset();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6 flex justify-center items-center gap-2">
        <FaHeadset /> Help & Support
      </h2>

      {/* Support Topics */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2">🛍️ Orders & Shipping</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Track your orders</li>
            <li>Shipping policies</li>
            <li>Delivery timelines</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2">🔁 Returns & Refunds</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Return eligibility</li>
            <li>How to request a return</li>
            <li>Refund processing time</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2">👗 Product Inquiries</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Size, fabric, and material info</li>
            <li>Color variations</li>
            <li>Out-of-stock requests</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2">🔐 Account & Security</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Change or reset password</li>
            <li>Manage addresses and profiles</li>
            <li>Privacy policy</li>
          </ul>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white outline-none rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">📨 Still need help?</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <textarea
            placeholder="Describe your issue..."
            rows="4"
            {...register("message", { required: "Message is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-pink-700 hover:bg-pink-900 text-white px-6 py-2 rounded-lg font-medium"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="mt-10 text-center text-sm text-gray-600 space-y-2">
        <p className="flex justify-center items-center gap-2">
          <FaPhoneAlt className="text-blue-600" /> +92 300 1234567
        </p>
        <p className="flex justify-center items-center gap-2">
          <FaEnvelope className="text-blue-600" /> support@sabiuniquecollection.com
        </p>
      </div>
    </div>
  );
}
