import { create } from "zustand";
import axios from "axios";

export const useSareeStore = create((set, get) => ({
  sarees: [],
  page: 1,
  total: 0,
  loading: false,
  error: null,

  fetchSarees: async (page = 1, limit = 16) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(
        `https://www.backend.sabiuniquecollection.com/api/products?page=${page}&limit=${limit}`
      );

      const newSarees = res.data?.data?.products || [];
      const total = res.data?.data?.total || 0;

      set((state) => ({
        sarees: page === 1 ? newSarees : [...state.sarees, ...newSarees],
        page,
        total,
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to load sarees.", loading: false, });
    }
  },
}));
