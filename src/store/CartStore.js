import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cartItems: [],
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
  clearCart: () => set({ cartItems: [] }),
}));
