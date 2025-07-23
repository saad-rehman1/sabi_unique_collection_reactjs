// store/cartStore.js
import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cartItems: [],
  addToCart: (item) => {
    const cart = get().cartItems;
    const existing = cart.find(i => i._id === item._id);
    if (existing) {
      set({
        cartItems: cart.map(i =>
          i._id === item._id ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
      });
    } else {
      set({ cartItems: [...cart, { ...item }] });
    }
  },
  removeFromCart: (id) => {
    set({ cartItems: get().cartItems.filter(i => i._id !== id) });
  },
  clearCart: () => set({ cartItems: [] }),
}));
