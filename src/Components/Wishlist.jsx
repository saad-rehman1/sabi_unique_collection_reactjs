import React from "react";
import { useCartWishlistStore } from "../store/CarWishlist";

const Wishlist = () => {
  const wishlistItems = useCartWishlistStore((state) => state.wishlistItems);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="space-y-4">
          {wishlistItems.map((item) => (
            <li key={item._id} className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-16 h-16" />
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p>${item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
