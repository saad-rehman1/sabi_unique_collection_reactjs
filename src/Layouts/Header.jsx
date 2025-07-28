import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Menu, X, Search, PackageSearch } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useCartWishlistStore } from "../store/CarWishlist"; // ✅ update the path if needed
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const fetchSearchResults = async ({ queryKey }) => {
  const [_key, searchQuery, page] = queryKey;
  if (!searchQuery) return { products: [], pagination: {} };
  const res = await axios.get(
    `https://www.backend.sabiuniquecollection.com/api/products/search?query=${searchQuery}&page=${page}`
  );
  return res.data.data;
};

const Header = () => {
  const cartItems = useCartWishlistStore((state) => state.cartItems);
  const wishlistItems = useCartWishlistStore((state) => state.wishlistItems);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState([]);

  const { data, isFetching } = useQuery({
    queryKey: ["search", debouncedQuery, page],
    queryFn: fetchSearchResults,
    enabled: !!debouncedQuery,
    keepPreviousData: true,
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    "SUMILUX",
    "Ready To Wear",
    "Tranding2025",
    "Unstitched",
    "KIDS",
    "Brands",
    "Blog",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
      setPage(1);
      setAllResults([]);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (data?.products?.length > 0) {
      setAllResults((prev) => [...prev, ...data.products]);
    }
  }, [data]);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const goToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <header className="w-full font-sans relative">
      {/* Contact Bar */}
      <div className="bg-gradient-to-r from-pink-100 to-pink-200 text-sm text-pink-900 px-6 py-2 flex justify-right gap-4 items-center shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm">
          <span>📞 +971 567413806</span>
          <span>📧 info@sabiuniquecollection.com</span>
          <span>📍 Sharjah, UAE</span>
          <button className="hidden sm:inline-flex items-center gap-2 bg-pink-500 text-white px-4 py-1.5 rounded-full hover:bg-pink-700 transition-all shadow-md">
            <PackageSearch size={18} /> Track Order
          </button>
        </div>
        <div className="flex gap-2 text-pink-700 items-center">
          <Search
            size={24}
            className="cursor-pointer hover:text-pink-600 transition-colors"
            onClick={() => setShowSearch(true)}
          />
          <FaFacebookF size={20} />
          <SiTiktok size={20} />
          <FaInstagram size={20} />
           <Link
            to="/register"
            className="flex items-center mx-2 space-x-2 hover:text-pink-950 transition"
          >
            <FaUser className="text-xl" />
            
          </Link>
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart
            size={24}
            className="text-pink-700 hover:text-pink-600"
          />
          {cartItems.length > 0 && (
            <span className="absolute -top-2  text-xs bg-pink-600 text-white  py-0.5 rounded-full">
              {cartItems.length}
            </span>
          )}
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/wishlist")}
        >
          <Heart size={24} className="text-pink-700 hover:text-pink-600" />
          {wishlistItems.length > 0 && (
            <span className="absolute -top-2  text-xs bg-pink-600 text-white  py-0.5 rounded-full">
              {wishlistItems.length}
            </span>
          )}

         
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white px-4 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-bold text-pink-700 hover:text-pink-900 tracking-wide">
          <Link to="/">Sabi Unique</Link>
        </h1>
        <ul className="hidden md:flex gap-6 font-medium text-gray-700">
          {links.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-pink-900 hover:text-pink-600 hover:underline underline-offset-4"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-pink-700">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <ul className="md:hidden px-4 pb-4 flex flex-col gap-4 text-gray-700 font-medium bg-pink-50 shadow-inner rounded-b-lg">
          {links.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="block py-2 px-3 rounded-md hover:bg-pink-100 hover:text-pink-700"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Search Drawer */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
          <div className="bg-white w-full sm:max-w-md h-full shadow-xl p-6 relative flex flex-col">
            <button
              onClick={() => setShowSearch(false)}
              className="absolute top-4 right-4 text-pink-700 hover:text-pink-500"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-pink-700">
              Search Products
            </h2>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type to search..."
              className="w-full border border-pink-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400"
            />

            {isFetching && <p className="mt-4 text-gray-500">Searching...</p>}
            {!isFetching && debouncedQuery && allResults.length === 0 && (
              <p className="mt-4 text-red-500">No results found.</p>
            )}

            <div className="mt-4 flex-1 overflow-y-auto space-y-4 pr-2">
              {allResults.map((item) => (
                <div
                  key={item.slug}
                  className="flex items-center gap-4 bg-pink-50 rounded-lg p-3 shadow-sm hover:shadow-md cursor-pointer"
                  onClick={() => goToDetails(item.slug)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <h4 className="text-sm font-semibold text-pink-900 truncate">
                      {item.name}
                    </h4>
                    <span className="text-pink-700 font-medium">
                      {item.price ? `$${item.price}` : "Price on request"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {data?.pagination?.page < data?.pagination?.pages && (
              <button
                onClick={handleLoadMore}
                className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-medium"
              >
                See More Products
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
