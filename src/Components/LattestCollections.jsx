import React from "react";
import { useLatestProductsQuery } from "../Services/EndPoint/lattestCollection";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCartWishlistStore } from "../store/CarWishlist";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ required once

function LattestCollections() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useLatestProductsQuery();

  const navigate = useNavigate();
  const addToCart = useCartWishlistStore((state) => state.addToCart);
  const addToWishlist = useCartWishlistStore((state) => state.addToWishlist);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success("Item added to cart!");
  };

  const handleAddToWishlist = (item) => {
    addToWishlist(item);
    toast.success("Item added to wishlist!");
  };

  return (
    <div className="w-full px-6 m-auto text-center py-10 bg-pink-50 min-h-screen">
      <h2 className="text-4xl font-bold text-pink-950 mb-2">Latest Saree Collections</h2>
      <p className="text-pink-950 mb-10">
        Discover our newest arrivals, featuring premium materials and timeless designs crafted for the modern wardrobe.
      </p>

      {isLoading && <p className="text-lg text-pink-900">Loading...</p>}
      {isError && <p className="text-red-500">{error.message || "Something went wrong."}</p>}

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.slice(0, 8).map((item) => (
          <div
            key={item._id}
            className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
          >
            <div
              className="relative overflow-hidden cursor-pointer"
              onClick={() => navigate(`/product/${item.slug}`)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item); // ✅ show toast
                  }}
                  className="bg-white p-2 rounded-full shadow hover:bg-pink-100"
                >
                  <FaShoppingCart className="text-pink-800" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToWishlist(item); // ✅ show toast
                  }}
                  className="bg-white p-2 rounded-full shadow hover:bg-pink-100"
                >
                  <FaHeart className="text-pink-800" />
                </button>
              </div>
            </div>

            <div
              className="p-4 text-left cursor-pointer"
              onClick={() => navigate(`/product/${item.slug}`)}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{item.name}</h3>
              <span className="text-pink-900 font-bold text-lg">${item.price}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/lattest-collection")}
        className="px-6 py-3 mt-10 bg-pink-900 text-white font-bold text-xl rounded-2xl shadow-md hover:bg-pink-200 hover:text-pink-900 hover:shadow-lg transition-all duration-300"
      >
        View All Collection
      </button>
    </div>
  );
}

export default LattestCollections;
