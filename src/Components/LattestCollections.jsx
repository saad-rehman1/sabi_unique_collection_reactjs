import React from "react";
import { useLatestProductsQuery } from "../Services/EndPoint/lattestCollection";
import { useNavigate, Link } from "react-router-dom";

function LattestCollections() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useLatestProductsQuery();

  const navigate = useNavigate();

  return (
    <div className="w-full px-6 m-auto text-center py-10 bg-pink-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-pink-950 mb-2">
        Latest Saree Collections
      </h2>
      <p className="text-center text-pink-950 mt-0 mb-10">
        Discover our newest arrivals, featuring premium materials and timeless
        designs crafted for the modern wardrobe.
      </p>

      {isLoading && (
        <p className="text-center text-lg text-pink-900">Loading...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">
          {error.message || "Something went wrong."}
        </p>
      )}

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.slice(0, 8).map((item) => (
          <Link
            to={`/product/${item.slug}`}
            key={item._id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
          >
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
              <span className="text-pink-900 font-bold text-lg">
                ${item.price}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={() => navigate("/lattest-collection")}
        className="px-6 py-3 mt-10 text-center mx-auto bg-pink-900 text-white font-bold text-xl rounded-2xl shadow-md hover:bg-pink-200 hover:text-pink-900 hover:shadow-lg transition-all duration-300"
      >
        View All Collection
      </button>
    </div>
  );
}

export default LattestCollections;
