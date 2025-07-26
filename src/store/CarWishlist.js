import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartWishlistStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      wishlistItems: [], // ✅ Add this line

      // CART ACTIONS
      addToCart: (product) => {
        const existing = get().cartItems.find((item) => item._id === product._id);
        if (existing) {
          set({
            cartItems: get().cartItems.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cartItems: [...get().cartItems, { ...product, quantity: 1 }],
          });
        }
      },

      removeFromCart: (id) => {
        set({
          cartItems: get().cartItems.filter((item) => item._id !== id),
        });
      },

      incrementQty: (id) => {
        set({
          cartItems: get().cartItems.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        });
      },

      decrementQty: (id) => {
        set({
          cartItems: get().cartItems.map((item) =>
            item._id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        });
      },

      // WISHLIST ACTIONS ✅
      addToWishlist: (product) => {
        const exists = get().wishlistItems.find((item) => item._id === product._id);
        if (!exists) {
          set({
            wishlistItems: [...get().wishlistItems, product],
          });
        }
      },

      removeFromWishlist: (id) => {
        set({
          wishlistItems: get().wishlistItems.filter((item) => item._id !== id),
        });
      },
    }),
    {
      name: "cart-wishlist-storage", // localStorage key
    }
  )
);
