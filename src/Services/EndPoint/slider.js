// src/Services/EndPoint/useMainSliderQuery.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../baseUrl";

const fetchHeroSliders = async () => {
  const { data } = await axios.get(`${baseUrl}/hero-sliders`);
  return data?.data?.heroSliders || [];
};

export const useMainSliderQuery = () =>
  useQuery({
    queryKey: ["hero-sliders"],
    queryFn: fetchHeroSliders,
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
    refetchOnWindowFocus: false,
  });
