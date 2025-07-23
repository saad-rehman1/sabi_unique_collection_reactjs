// store/categoryStore.js
import { create } from 'zustand';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

export const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${baseUrl}/categories`);
      set({ categories: data.data.categories, loading: false });
    } catch (err) {
      console.error("Category Fetch Error:", err);
      set({ error: err.message, loading: false });
    }
  },
}));
