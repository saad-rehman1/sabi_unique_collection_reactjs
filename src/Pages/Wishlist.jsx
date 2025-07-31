import React from "react";
import { useCartWishlistStore } from "../store/CarWishlist";
import { toast } from "react-hot-toast"; // ✅ using react-hot-toast
import { FaHeartBroken, FaShoppingCart } from "react-icons/fa";

const Wishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    addToCart,
    cartItems,
  } = useCartWishlistStore();

  const handleAddToCart = (item) => {
    const alreadyInCart = cartItems.find((cartItem) => cartItem._id === item._id);
    addToCart(item);

    if (alreadyInCart) {
      toast.success("Item quantity increased in cart");
    } else {
      toast.success("Item added to cart");
    }
  };

  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
    toast.error("Item removed from wishlist");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="space-y-4">
          {wishlistItems.map((item) => (
            <li key={item._id} className="flex items-center gap-4 border p-4 rounded-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-pink-700 hover:bg-pink-950 text-white px-3 py-2 rounded-md flex items-center gap-1"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md flex items-center gap-1"
                >
                  <FaHeartBroken /> Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
