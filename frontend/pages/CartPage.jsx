import React from "react";
import { useCart } from "../auth/CartContext";
import { Trash2 } from "lucide-react";

function CartPage() {
  const { cart, updateCart, removeFromCart } = useCart();

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-48">
        <p className="text-gray-500 text-lg">🛒 Your Cart Is Empty</p>
      </div>
    );
  }

  return (
    <div className="mt-40 min-h-screen flex flex-col items-center px-4">
      <h3 className="text-3xl font-bold mb-10 text-gray-800 tracking-wide">
        My Cart
      </h3>

      <div className="space-y-5 w-full max-w-3xl">
        {cart.items.map((item) => {
          if (!item.book) return null;

          return (
            <div
              key={item._id}
              className="flex items-center gap-5 border rounded-2xl p-5 shadow-md bg-white hover:shadow-lg transition-all duration-300 animate-fade-in"
            >
              {/* صورة الكتاب */}
              <img
                src={`http://localhost:5000/images/${item.book.coverImage}`}
                className="rounded-xl w-40 h-32 object-cover shadow-sm"
                alt={item.book.title}
              />

              {/* تفاصيل الكتاب */}
              <div className="flex-1">
                <h2 className="font-semibold text-lg text-gray-800">
                  {item.book.title}
                </h2>
                <p className="text-gray-500 text-sm">{item.book.author}</p>

                <p className="text-gray-700 text-md font-medium mt-2">
                  ${item.book.price}
                </p>

                {/* التحكم بالكمية */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    className="disabled:opacity-40 border border-gray-300 px-3 py-1 rounded-lg text-lg hover:bg-gray-100 transition"
                    disabled={item.quantity <= 1}
                    onClick={() => updateCart(item.book._id, item.quantity - 1)}
                  >
                    -
                  </button>

                  <span className="font-semibold w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    className="border border-gray-300 px-3 py-1 rounded-lg text-lg hover:bg-gray-100 transition"
                    onClick={() => updateCart(item.book._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* السعر والحذف */}
              <div className="text-right">
                <p className="text-indigo-700 font-semibold text-lg">
                  Total: ${(item.book.price * item.quantity).toFixed(2)}
                </p>

                <div className="relative group inline-block">
                  <button
                    onClick={() => removeFromCart(item.book._id)}
                    className="text-red-500 hover:text-red-600 p-2 rounded-full transition-colors duration-300"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>

                  {/* Tooltip */}
                  <div
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 
                  transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0 pointer-events-none whitespace-nowrap"
                  >
                    Delete
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CartPage;
