import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../auth/CartContext";
import { useAuth } from "../auth/AuthContext";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const { AddToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // Fetch book details
  const fetchBook = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/books/${id}`);
      const data = await res.json();
      setBook(data);
    } catch (error) {
      console.error("Error fetching book:", error);
      setMessage("Failed to load book data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (loading) return <p className="mt-44">Loading...</p>;
  if (!book) return <p className="mt-44">Book not found.</p>;

  // Handle adding to cart
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (book.stock === 0) {
      setMessage("Sorry, this book is out of stock!");
      return;
    }

    if (quantity > book.stock) {
      setMessage(`Cannot add more than ${book.stock} items.`);
      return;
    }

    try {
      setIsAdding(true);

      // Optimistic UI: تحديث المخزون فوراً على الواجهة
      setBook((prevBook) => ({
        ...prevBook,
        stock: prevBook.stock - quantity,
      }));

      await AddToCart(book._id, quantity); // AddToCart الآن يقبل كمية

      setMessage(`Added ${quantity} item(s) to Cart successfully!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage("Failed to add to cart. Try again.");
      // Rollback optimistic UI إذا فشل
      fetchBook();
    } finally {
      setIsAdding(false);
    }
  };

return (
  <div className="mt-36 max-w-6xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition-all duration-300">

      {/* صورة الكتاب */}
      <div className="flex justify-center">
        <img
          className="w-80 h-[460px] object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          src={`http://localhost:5000/images/${book.coverImage}`}
          alt={book.title}
        />
      </div>

      {/* التفاصيل */}
      <div>
        <h3 className="mb-3 text-3xl font-bold text-gray-800">{book.title}</h3>

        <h4 className="mb-3 text-lg font-medium text-blue-600">
          {book.category?.name}
        </h4>

        <p className="text-lg text-gray-700 mb-3 font-medium">
          ✍️ {book.author}
        </p>

        <p className="text-gray-600 leading-relaxed mb-5">
          {book.description}
        </p>

        <p className="text-2xl font-semibold text-red-600 mb-3">
          {book.price}$
        </p>

        <p
          className={`text-lg font-medium mb-4 ${
            book.stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {book.stock > 0 ? `${book.stock} Available` : "Out of Stock"}
        </p>

        {/* زر الاضافة للسلة */}
        <button
          onClick={handleAddToCart}
          disabled={book.stock === 0 || isAdding}
          className={`w-full py-3 rounded-xl font-medium text-white text-lg shadow-md 
            ${
              book.stock === 0
                ? "bg-gray-400"
                : isAdding
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
            }
            transition-all duration-300
          `}
        >
          {book.stock === 0
            ? "Out of Stock"
            : isAdding
            ? "Adding..."
            : "Add to Cart"}
        </button>

        {/* رسالة النجاح */}
        {message && (
          <div className="mt-5 p-3 rounded-xl bg-green-100 text-green-700 text-center animate-fade-in shadow-sm">
            {message}
          </div>
        )}
      </div>
    </div>
  </div>
);

}

export default BookDetails;
