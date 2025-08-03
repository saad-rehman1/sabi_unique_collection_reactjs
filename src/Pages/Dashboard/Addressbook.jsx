import React, { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaUser,
  FaMapMarkedAlt,
  FaCity,
  FaFlag,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export default function AddressBook() {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (Object.values(formData).some((field) => field.trim() === "")) return;
    setAddresses([...addresses, formData]);
    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-pink-600">
        📫 Address Book
      </h2>

      {/* Form Section (shown if no address is added) */}
      {addresses.length === 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8 space-y-4">
          <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
            <FaPlus className="text-pink-500" /> Add New Address
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center border rounded-md px-3">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full py-2 outline-none"
              />
            </div>
            <div className="flex items-center border rounded-md px-3">
              <FaMapMarkedAlt className="text-gray-400 mr-2" />
              <input
                type="text"
                name="street"
                placeholder="Enter your street"
                value={formData.street}
                onChange={handleChange}
                className="w-full py-2 outline-none"
              />
            </div>
            <div className="flex items-center border rounded-md px-3">
              <FaCity className="text-gray-400 mr-2" />
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                className="w-full py-2 outline-none"
              />
            </div>
            <div className="flex items-center border rounded-md px-3">
              <FaFlag className="text-gray-400 mr-2" />
              <input
                type="text"
                name="state"
                placeholder="Country / State"
                value={formData.state}
                onChange={handleChange}
                className="w-full py-2 outline-none"
              />
            </div>
            <div className="flex items-center border rounded-md px-3">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="text"
                name="zip"
                placeholder="Enter your postal code"
                value={formData.zip}
                onChange={handleChange}
                className="w-full py-2 outline-none"
              />
            </div>
            <div className="flex items-center border rounded-md px-3">
              <FaPhoneAlt className="text-gray-400 mr-2" />
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full py-2 outline-none"
              />
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl flex items-center gap-2 transition"
          >
            <FaPlus /> Save Address
          </button>
        </div>
      )}

      {/* Saved Addresses */}
      <div className="grid gap-4">
        {addresses.length === 0 ? (
          <p className="text-center text-gray-500">
            No addresses added yet.
          </p>
        ) : (
          addresses.map((address, index) => (
            <div
              key={index}
              className="bg-pink-50 border border-pink-200 p-4 rounded-xl shadow flex justify-between items-start"
            >
              <div className="space-y-1">
                <p className="font-semibold text-lg text-pink-800 flex items-center gap-1">
                  <FaUser className="text-pink-400" /> {address.name}
                </p>
                <p className="flex items-center gap-1">
                  <FaMapMarkedAlt className="text-gray-400" />
                  {address.street}
                </p>
                <p className="flex items-center gap-1">
                  <FaCity className="text-gray-400" />
                  {address.city}, {address.state} - {address.zip}
                </p>
                <p className="flex items-center gap-1 text-gray-600">
                  <FaPhoneAlt className="text-gray-400" />
                  {address.phone}
                </p>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700 text-xl"
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
