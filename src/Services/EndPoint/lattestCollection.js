// src/Services/EndPoint/lattestCollection.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchLatestProducts = async () => {
  const res = await axios.get("https://www.backend.sabiuniquecollection.com/api/products/latest");
  return res.data.data.products;
};

export const useLatestProductsQuery = () =>
  useQuery({
    queryKey: ["latest-products"],
    queryFn: fetchLatestProducts,
  });
