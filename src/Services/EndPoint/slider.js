import { create } from 'zustand';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

export const mainSlider = create((set) => ({
  sarees: [],
  loading: false,
  error: null,

  fetchSarees: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${baseUrl}/hero-sliders`);
      const heroSliders = response.data?.data?.heroSliders || [];
      console.log("✅ Fetched Sliders:", heroSliders);
      set({ sarees: heroSliders, loading: false });
    } catch (err) {
      console.error("❌ Slider API Error:", err.message);
      set({ error: err.message, loading: false });
    }
  },
}));
