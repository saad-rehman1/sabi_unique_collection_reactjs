import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Heart, ShoppingCart } from "lucide-react";
import { useCartWishlistStore } from "../store/CarWishlist";
import { toast } from "react-toastify";

const fetchLatestPaginated = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `https://www.backend.sabiuniquecollection.com/api/products/latest?page=${pageParam}`
  );
  return res.data.data;
};

const SareeCard = ({ item }) => {
  const addToCart = useCartWishlistStore((state) => state.addToCart);
  const addToWishlist = useCartWishlistStore((state) => state.addToWishlist);

  const handleAddToCart = () => {
    addToCart(item);
    toast.success(`${item.name} added to cart`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleAddToWishlist = () => {
    addToWishlist(item);
    toast.success(`${item.name} added to wishlist`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="relative group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <div className="overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Hover Icons */}
      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleAddToCart}
          className="bg-white p-2 rounded-full shadow hover:bg-pink-100"
          title="Add to Cart"
        >
          <ShoppingCart size={20} className="text-pink-800" />
        </button>
        <button
          onClick={handleAddToWishlist}
          className="bg-white p-2 rounded-full shadow hover:bg-pink-100"
          title="Add to Wishlist"
        >
          <Heart size={20} className="text-pink-800" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {item.name}
        </h3>
        <span className="text-pink-900 font-bold text-lg">
          ${item.price}
        </span>
      </div>
    </div>
  );
};

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
      lastPage?.pagination?.hasMore
        ? lastPage.pagination.page + 1
        : undefined,
  });

  const latestProducts = data?.pages?.flatMap((page) => page.products) || [];

  return (
    <div className="w-full px-6 text-center py-10 bg-pink-50 min-h-screen">
      <h2 className="text-4xl font-bold text-pink-950 mb-4">
        Latest Saree Collection
      </h2>
      <p className="text-pink-900 mb-8">
        Shop our newest arrivals now.
      </p>

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
