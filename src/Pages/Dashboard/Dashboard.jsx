// src/pages/Dashboard/DashboardLayout.jsx
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaAddressBook,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaQuestionCircle,
} from "react-icons/fa";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const menu = [
    { label: "Account", path: "account", icon: <FaUser /> },
    { label: "Password", path: "password", icon: <FaLock /> },
    { label: "Address Book", path: "address-book", icon: <FaAddressBook /> },
    { label: "Orders", path: "orders", icon: <FaShoppingCart /> },
    { label: "Wishlist", path: "wishlist", icon: <FaHeart /> },
    { label: "Help & Support", path: "help-support", icon: <FaQuestionCircle /> },
  ];

  const handleLogout = () => {
    // Clear auth data and navigate to login
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 shadow-md space-y-4">
        <h2 className="text-xl font-bold text-pink-700 mb-6">My Dashboard</h2>
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                isActive
                  ? "bg-pink-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}

        {/* Log Out - separate visually */}
        <hr className="my-4 border-gray-200" />
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full"
        >
          <FaSignOutAlt />
          Log Out
        </button>
      </aside>

      {/* Page content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
