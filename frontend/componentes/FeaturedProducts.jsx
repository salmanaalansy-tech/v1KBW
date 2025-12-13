import { useState, useEffect } from "react";
import { useCart } from "../auth/CartContext";

function FeaturedProducts() {
  const [bookList, setBookList] = useState();

  const { AddToCart } = useCart();

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/books/getBooks")
      .then((res) => res.json())
      .then((data) => setBookList(data))
      .catch((err) => console.error("error fetching books", err));
  }, []);

  // update pages
  const handleAdd = async (bookId) => {
    await AddToCart(bookId);
    fetch("http://localhost:5000/books/getBooks")
      .then((res) => res.json())
      .then((data) => setBookList(data));
  };

  // show books featured
  const featuredBooks =
    bookList?.filter((book) => book.isFeatured === true) || [];

return (
    <div className="px-4 md:px-16 lg:px-24 py-8 bg-gray-50 mt-6 rounded-lg">
      {/* عنوان القسم */}
      <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Featured Books
      </h3>

      {/* رسالة Toast */}
  {message && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl px-6 py-5 w-80 text-center smooth-popup">
      <h3 className="text-lg font-semibold text-gray-700">
        {message}
      </h3>

      <button
        onClick={() => setMessage("")}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
      >
        OK
      </button>
    </div>
  </div>
)}

      {/* شبكة الكتب */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookList?.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* صورة الكتاب مع Overlay */}
            <a href={`/bookDetails/${book._id}`} className="relative block">
              <img
                src={`http://localhost:5000/images/${book.coverImage}`}
                alt={book.title}
                className="w-full h-64 object-cover"
                loading="lazy"
              />

              {/* Overlay يظهر عند hover */}
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex flex-col justify-end p-4 transition-opacity duration-300">
                <strong className="text-white text-lg mb-2">
                  {book.price} $
                </strong>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    AddToCart(book._id);
                    setBookList((prev) =>
                      prev.map((b) =>
                        b._id === book._id
                          ? { ...b, stock: b.stock - 1 }
                          : b
                      )
                    );
                    setMessage("Added To Cart Successfully");

                    // إزالة الرسالة بعد 2 ثانية
                    setTimeout(() => setMessage(""), 2000);
                  }}
                  disabled={book.stock === 0}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                    book.stock === 0
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {book.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </a>

            {/* معلومات الكتاب */}
            <div className="p-4 text-center">
              <h6 className="text-lg font-semibold text-gray-800 mb-1">
                {book.title}
              </h6>
              <span className="text-gray-500 text-sm">{book.author}</span>
              <div className="text-sm text-gray-400 mt-2">
                Stock: {book.stock}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tailwind Animation */}
  
    </div>
  );
}



export default FeaturedProducts;
<style jsx>{`
  @keyframes smoothPopup {
    0% {
      opacity: 0;
      transform: translateY(25px) scale(0.9);
    }
    60% {
      opacity: 1;
      transform: translateY(-5px) scale(1.03);
    }
    100% {
      transform: translateY(0) scale(1);
    }
  }

  .smooth-popup {
    animation: smoothPopup 0.45s ease-out;
  }
`}</style>

