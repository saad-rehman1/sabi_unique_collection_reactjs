import { useCartWishlistStore } from "../store/CarWishlist";
import { toast } from "react-toastify";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    incrementQty,
    decrementQty,
  } = useCartWishlistStore();

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.error("Item removed from cart");
  };

  const handleIncrement = (id) => {
    incrementQty(id);
    toast.success("Quantity increased");
  };

  const handleDecrement = (id) => {
    decrementQty(id);
    toast.info("Quantity decreased");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-6">
          {cartItems.map((item) => (
            <li
              key={item._id}
              className="flex items-center gap-6 border p-4 rounded-xl"
            >
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.name}
                className="w-36 h-36 object-cover rounded-md border"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-gray-600">${item.price}</p>

                <div className="flex items-center mt-2 gap-3">
                  <button
                    onClick={() => handleDecrement(item._id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <FaMinus />
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
