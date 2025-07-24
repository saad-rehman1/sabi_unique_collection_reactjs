import { create } from "zustand";

export const useCartWishlistStore = create((set, get) => ({
  cartItems: [],
  wishlistItems: [],

  addToCart: (product) => {
    const exists = get().cartItems.find((item) => item._id === product._id);
    if (exists) return;
    set((state) => ({
      cartItems: [...state.cartItems, { ...product, quantity: 1 }],
    }));
  },

  addToWishlist: (product) => {
    const exists = get().wishlistItems.find((item) => item._id === product._id);
    if (exists) return;
    set((state) => ({
      wishlistItems: [...state.wishlistItems, product],
    }));
  },

  removeFromCart: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item._id !== id),
    }));
  },

  removeFromWishlist: (id) => {
    set((state) => ({
      wishlistItems: state.wishlistItems.filter((item) => item._id !== id),
    }));
  },

  clearCart: () => set({ cartItems: [] }),
  clearWishlist: () => set({ wishlistItems: [] }),
}));
