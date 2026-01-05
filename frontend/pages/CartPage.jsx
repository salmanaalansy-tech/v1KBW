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
    <div className="mt-24 md:mt-40 min-h-screen flex flex-col items-center px-4 mb-10">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-gray-800 tracking-wide">
        My Cart
      </h3>

      <div className="space-y-4 md:space-y-5 w-full max-w-4xl">
        {cart.items.map((item) => {
          if (!item.book) return null;
          
          return (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 border rounded-2xl p-4 md:p-5 shadow-sm bg-white hover:shadow-md transition-all duration-300 animate-fade-in"
            >
              {/* صورة الكتاب */}
              <div className="w-full sm:w-40 flex justify-center">
                <img
                  src={`http://localhost:5000/images/${item.book.coverImage}`}
                  className="rounded-xl w-full max-w-[160px] sm:w-40 h-48 sm:h-32 object-cover shadow-sm"
                  alt={item.book.title}
                />
              </div>

              {/* تفاصيل الكتاب */}
              <div className="flex-1 text-center sm:text-left w-full">
                <h2 className="font-semibold text-lg text-gray-800 leading-tight">
                  {item.book.title}
                </h2>
                <p className="text-gray-500 text-sm mt-1">{item.book.author}</p>

                <p className="text-gray-700 text-md font-medium mt-2">
                  ${item.book.price}
                </p>

                {/* التحكم بالكمية */}
                <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
                  <div className="flex items-center gap-3">
                    <button
                      className="disabled:opacity-40 border border-gray-300 w-8 h-8 flex items-center justify-center rounded-lg text-lg hover:bg-gray-100 transition"
                      disabled={item.quantity <= 1}
                      onClick={() => updateCart(item.book._id, item.quantity - 1)}
                    >
                      -
                    </button>

                    <span className="font-semibold min-w-[20px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      className="border border-gray-300 w-8 h-8 flex items-center justify-center rounded-lg text-lg hover:bg-gray-100 transition"
                      onClick={() => updateCart(item.book._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* السعر والحذف */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <p className="text-indigo-700 font-bold text-lg">
                  ${(item.book.price * item.quantity).toFixed(2)}
                </p>

                <div className="relative group inline-block sm:mt-2">
                  <button
                    onClick={() => removeFromCart(item.book._id)}
                    className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-full transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5 md:w-6 h-6" />
                  </button>

                  {/* Tooltip - Hidden on touch devices */}
                  <div
                    className="hidden md:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 
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
