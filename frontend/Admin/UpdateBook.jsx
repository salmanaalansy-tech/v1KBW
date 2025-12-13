import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Loader2,Pencil, Trash2} from 'lucide-react'
function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error feching book:", error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/books/updateBook/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      const data = await res.json();
      alert(data.message);
      navigate("/admin/all-books");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handelChing = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handelDelete = async () => {
    if (!window.confirm("Are you sure you want delete this book")) return;

    try {
      const res = await fetch(`http://localhost:5000/books/deleteBook/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message);

      navigate("/admin/all-books");
    } catch (error) {
      console.error("Error Delete book:", error);
    }
  };
 if (loading) {
    return <div className=" ">
          <Loader2 size={40} className="animate-spin m-auto" />
      </div>;
  }
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded ">
      <h3 className="mt-2 p-3"> Update Book</h3>
      <input
        className="border p-2 w-full mb-3"
        type="text"
        name="title"
        value={book.title || ""}
        onChange={handelChing}
        placeholder="Titl"
      />
      <input
        className="border p-2 w-full mb-3"
        type="text"
        name="author"
        value={book.author || ""}
        onChange={handelChing}
        placeholder="Author"
      />

      <textarea
        className="border p-2 w-full mb-3"
        name="description"
        value={book.description || ""}
        onChange={handelChing}
        placeholder="Description"
      />

      <input
        className="border p-2 w-full mb-3"
        type="number"
        name="price"
        value={book.price || ""}
        onChange={handelChing}
        placeholder="Price"
      />

      <input
        className="border p-2 w-full mb-3"
        type="number"
        name="stock"
        value={book.stock || ""}
        onChange={handelChing}
        placeholder="stock"
      />
    <div className="flex justify-between mt-6">

  {/* Update Button */}
  <button
    onClick={handleUpdate}
    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition"
  >
    <Pencil className="w-5 h-5" />
    Update
  </button>

  {/* Delete Button */}
  <button
    onClick={handelDelete}
    className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-red-700 active:scale-95 transition"
  >
    <Trash2 className="w-5 h-5" />
    Delete
  </button>
</div>
    </div>
  );
}

export default UpdateBook;
