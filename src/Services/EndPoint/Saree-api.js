// src/Services/EndPoint/useSareesQuery.js
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSarees = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `https://www.backend.sabiuniquecollection.com/api/products?page=${pageParam}`
  );

  return {
    products: res.data.data.products,
    nextPage: pageParam + 1,
    total: res.data.data.pagination.total,
    currentPage: pageParam,
  };
};

export const useSareesQuery = () =>
  useInfiniteQuery({
    queryKey: ["sarees"],
    queryFn: fetchSarees,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.flatMap((p) => p.products).length;
      if (loaded < lastPage.total) return lastPage.nextPage;
      return undefined;
    },
  });
