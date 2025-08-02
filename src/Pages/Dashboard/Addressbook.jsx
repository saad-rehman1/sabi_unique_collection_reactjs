import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

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

  const handleDelete = (index) => {
    const updated = [...addresses];
    updated.splice(index, 1);
    setAddresses(updated);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">📫 Address Book</h2>

      {/* Add Address Form */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 space-y-4">
        <h3 className="text-xl font-medium">Add New Address</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={formData.zip}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-pink-600 hover:bg-pink-800 text-white rounded-xl flex items-center gap-2"
        >
          <FaPlus /> Add Address
        </button>
      </div>

      {/* Address List */}
      <div className="grid gap-4">
        {addresses.length === 0 ? (
          <p className="text-center text-gray-500">No addresses added yet.</p>
        ) : (
          addresses.map((address, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-xl shadow flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-lg">{address.name}</p>
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state} - {address.zip}
                </p>
                <p className="text-gray-500">{address.phone}</p>
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
