import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [] });

  // جلب السلة عند التحميل
  useEffect(() => {
    fetch("http://localhost:5000/carts", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setCart(data.cart || { items: [] }))
      .catch((err) => console.error("Failed to fetch cart:", err));
  }, []);

  // إضافة عنصر للسلة
  const AddToCart = async (bookId) => {
    try {
      const res = await fetch("http://localhost:5000/carts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bookId }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Error adding to cart");
        return;
      }
      setCart(data.cart || { items: [] });
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const updateCart = async (bookId, quantity) => {
    try {
      const res = await fetch("http://localhost:5000/carts/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bookId, quantity }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Error updating cart");
        return;
      }
      setCart(data.cart || { items: [] });
    } catch (err) {
      console.error("Failed to update cart:", err);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      const res = await fetch(`http://localhost:5000/carts/remove/${bookId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      setCart(data.cart || { items: [] });
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, AddToCart, updateCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
