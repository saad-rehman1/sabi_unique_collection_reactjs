import React from "react";
import { FaHeartBroken, FaShoppingCart } from "react-icons/fa";
import { useCartWishlistStore } from "../store/CarWishlist"; // adjust the path if needed

export default function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
    addToCart,
    cartItems,
  } = useCartWishlistStore();

  const handleAddToCart = (item) => {
    const alreadyInCart = cartItems.find((cart) => cart.id === item.id);
    if (alreadyInCart) return;
    addToCart(item);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">💖 My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-200 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-blue-600 font-bold">₹{item.price.toLocaleString()}</p>

                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={cartItems.find((c) => c.id === item.id)}
                    className="flex items-center gap-1 text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-sm disabled:opacity-50"
                  >
                    <FaShoppingCart /> {cartItems.find((c) => c.id === item.id) ? "In Cart" : "Add to Cart"}
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                  >
                    <FaHeartBroken /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
