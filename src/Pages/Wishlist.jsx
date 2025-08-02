import React from "react";
import { useCartWishlistStore } from "../store/CarWishlist";
import { toast } from "react-hot-toast";
import { FaHeartBroken, FaShoppingCart } from "react-icons/fa";

export default function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
    addToCart,
    cartItems,
  } = useCartWishlistStore();

  const handleAddToCart = (item) => {
    const alreadyInCart = cartItems.find((cartItem) => cartItem._id === item._id);
    addToCart(item);
    toast.success(alreadyInCart ? "Item quantity increased in cart" : "Item added to cart");
  };

  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
    toast.error("Item removed from wishlist");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-6 bg-white border border-gray-200 rounded-2xl shadow p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-24 object-cover rounded-md border"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">SKU: {item.sku || "—"}</p>
                <p className="text-red-600 font-bold">AED {item.price}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#a01c2f] hover:bg-[#8b1a2a] text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  className="text-gray-500 hover:text-red-600 flex items-center gap-1"
                  title="Remove"
                >
                  <FaHeartBroken size={18} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
