import React, { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace this with actual logged-in user token if needed
  const fetchOrders = async () => {
    try {
      // Use your real API endpoint here
      const response = await axios.get(
        "https://www.backend.sabiuniquecollection.com/api/orders"
      );
      setOrders(response.data.orders); // adjust key as needed
    } catch (error) {
      console.error("Failed to fetch orders", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">📦 My Orders</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <FaBoxOpen className="text-4xl mx-auto mb-2" />
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-2xl p-4 md:p-6"
            >
              <div className="flex justify-between items-center flex-wrap gap-2 border-b pb-3 mb-4">
                <div>
                  <p className="font-semibold">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </div>
              </div>

              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 mb-3 last:mb-0"
                >
                  <img
                    src={item.product.image} // Adjust based on your API response
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right font-semibold text-blue-600">
                    ₹{item.price.toLocaleString()}
                  </div>
                </div>
              ))}

              <div className="mt-4 text-right font-bold text-lg">
                Total: ₹{order.totalAmount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
