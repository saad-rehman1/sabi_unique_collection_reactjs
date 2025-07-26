import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCartWishlistStore } from "../store/CarWishlist";
import { Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latestProducts, setLatestProducts] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartWishlistStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://www.backend.sabiuniquecollection.com/api/products/by-slug/${slug}`
        );
        setProduct(res.data.data);
        setMainImageIndex(0);
        setQuantity(1);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await axios.get(
          "https://www.backend.sabiuniquecollection.com/api/products/latest"
        );
        setLatestProducts(res.data.data.products || []);
      } catch (err) {
        console.error("Error fetching latest products:", err);
      }
    };
    fetchLatest();
  }, []);

  if (loading)
    return (
      <p className="text-center py-20 text-lg font-semibold">Loading...</p>
    );
  if (!product)
    return (
      <p className="text-center py-20 text-lg font-semibold text-red-500">
        Product not found.
      </p>
    );

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success("Added to cart successfully!");
  
    
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-800">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div>
          <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={product.images?.[mainImageIndex]?.url || "/fallback.jpg"}
              alt="Main"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex gap-3 mt-4 flex-wrap">
            {product.images?.map((img, idx) => (
              <img
                key={img._id}
                src={img.url}
                onClick={() => setMainImageIndex(idx)}
                className={`w-20 h-20 object-cover rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  idx === mainImageIndex
                    ? "border-pink-600 ring ring-pink-200 scale-105"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-pink-800 mb-4">
            {product.name}
          </h1>
          <p className="text-xl font-bold text-gray-900 mb-2">
            Price: ${product.price}
          </p>
          <p className="text-gray-600 text-sm mb-1">SKU: {product.sku}</p>
          <p className="text-sm text-gray-500 mb-4">
            Category: {product.categories?.[0]?.name || "Uncategorized"}
          </p>
          <div
            className="text-base leading-7 prose max-w-none text-gray-700 mb-4"
            dangerouslySetInnerHTML={{ __html: product.shortDescription }}
          />

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="bg-gray-100 px-3 py-2 hover:bg-gray-200"
              >
                <Minus size={18} />
              </button>
              <span className="px-4 text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="bg-gray-100 px-3 py-2 hover:bg-gray-200"
              >
                <Plus size={18} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              
              className="bg-pink-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-pink-700 transition-all duration-200 shadow-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 border-t pt-6">
        <div className="flex gap-6 text-lg font-semibold border-b mb-4">
          {["description", "delivery", "shipping"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 capitalize transition-colors duration-200 ${
                activeTab === tab
                  ? "border-b-2 border-pink-600 text-pink-700"
                  : "text-gray-600 hover:text-pink-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "description"
                ? "Product Description"
                : tab === "delivery"
                ? "Delivery Policy"
                : "Shipping & Return"}
            </button>
          ))}
        </div>

        <div className="text-gray-700 leading-7 space-y-4">
          {activeTab === "description" && (
            <>
              <p>
                Elevate your wardrobe with this elegant 3-piece suit from the
                Sabi Unique Collection UAE.
              </p>
              <ul className="list-disc ml-6">
                <li>
                  <strong>Fabric Type:</strong> High-quality digitally printed
                  lawn
                </li>
                <li>
                  <strong>Front Design:</strong> Embroidered front panel
                </li>
                <li>
                  <strong>Dupatta:</strong> Lightweight printed lawn
                </li>
              </ul>
              <p>Sizes: MEDIUM, LARGE</p>
            </>
          )}
          {activeTab === "delivery" && (
            <p>
              We offer fast delivery across the UAE. Most orders are delivered
              within 2–5 business days.
            </p>
          )}
          {activeTab === "shipping" && (
            <p>
              Returns are accepted within 7 days of delivery. Contact our
              support for more info.
            </p>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-pink-800 mb-6">
          You May Also Like
        </h2>
        {latestProducts.length === 0 ? (
          <p className="text-gray-500">No related products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {latestProducts
              .filter((p) => p.slug !== slug)
              .map((prod) => (
                <div
                  key={prod._id}
                  onClick={() => navigate(`/product/${prod.slug}`)}
                  className="cursor-pointer border rounded-xl overflow-hidden hover:shadow-lg transition-all bg-white"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                      {prod.name}
                    </h3>
                    <p className="text-sm text-pink-700 font-semibold">
                      ${prod.price}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
