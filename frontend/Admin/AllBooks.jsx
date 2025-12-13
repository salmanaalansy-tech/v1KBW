import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {Loader2} from 'lucide-react'
import { Link } from "react-router-dom";
function AllBooks() {
  const [bookList, setBookList] = useState([]);
const totalBooks=bookList?.length || 0
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const { isAuthenticated, isAdmin, user } = useAuth();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/getBooks", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 401 || res.status === 403) {
          setError("Not authorized");
          navigate("/", { replace: true });
          return;
        }

        if (!res.ok) {
          throw new Error(`HTTP error! status ${res.status}`);
        }

        const data = await res.json();

        console.log("Books data:", data);
        console.log("Books data:", data);
        setBookList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Error feching book", error);
        navigate("/", { replace: true });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && isAdmin) {
      fetchBooks();
    } else {
      console.log("not authentticated or not admin");
      navigate("/", { replace: true });
    }
  }, [navigate, isAuthenticated, isAdmin]);

  // ==========Loding
  if (loading) {
    return <div className=" ">
          <Loader2 size={40} className="animate-spin m-auto" />
      </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
  

<div>
  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
  All Books 
  <span className="px-3 py-1 bg-blue-700 text-white rounded-full text-[24px]">
    {totalBooks}
  </span>
</h3>

  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
    {bookList?.map((book) => (
      <Link
        key={book?._id}
        to={`/admin/update-book/${book?._id}`}
        className="block"
      >
        <div className="text-center flex flex-col rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-white">

          <img
            alt="Book"
            src={`http://localhost:5000/images/${book.coverImage}`}
            className="w-full h-56 object-cover"
          />

          <div className="p-4 flex flex-col gap-2">
            <h6 className="text-lg font-semibold line-clamp-1">{book?.title}</h6>
            <span className="text-gray-500 text-sm">{book?.author}</span>

            <strong className="text-red-600 text-xl">{book?.price} $</strong>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>

  );
}

export default AllBooks;
