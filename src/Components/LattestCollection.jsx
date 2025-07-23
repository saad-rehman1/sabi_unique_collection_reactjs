import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchLatestPaginated = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `https://www.backend.sabiuniquecollection.com/api/products/latest?page=${pageParam}`
  );
  return res.data.data;
};

const SareeCard = ({ item }) => (
  <Link to={`/product/${item.slug}`}>
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {item.name}
        </h3>
        <span className="text-pink-900 font-bold text-lg">${item.price}</span>
      </div>
    </div>
  </Link>
);

function LattestCollection() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["latestProducts"],
    queryFn: fetchLatestPaginated,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore
        ? lastPage.pagination.page + 1
        : undefined,
  });

  const latestProducts = data?.pages.flatMap((page) => page.products) || [];

  return (
    <div className="w-full px-6 text-center py-10 bg-pink-50 min-h-screen">
      <h2 className="text-4xl font-bold text-pink-950 mb-4">
        Latest Saree Collection
      </h2>
      <p className="text-pink-900 mb-8">Shop our newest arrivals now.</p>

      {isLoading && <p>Loading latest sarees...</p>}
      {isError && (
        <p className="text-red-500">
          {error?.message || "Something went wrong."}
        </p>
      )}

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {latestProducts.map((item) => (
          <SareeCard key={item._id} item={item} />
        ))}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="px-6 py-3 mt-10 text-center mx-auto bg-pink-900 text-white font-bold text-xl rounded-2xl shadow-md hover:bg-pink-200 hover:text-pink-900 transition-all duration-300 disabled:opacity-50"
        >
          {isFetchingNextPage ? "Loading more..." : "View More"}
        </button>
      )}
    </div>
  );
}

export default LattestCollection;
