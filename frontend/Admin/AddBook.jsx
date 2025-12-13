/**
 *  خريطة ملف: AddBook.js
 * ──────────────────────────────────────────────
 * هذا الملف يحتوي على مكوّن React لإضافة كتاب جديد
 * إلى قاعدة البيانات عبر واجهة المستخدم.
 * يتضمن المكون حقول الإدخال، رفع الصورة، المعاينة،
 * وإرسال البيانات إلى الخادم (Backend API).
 * ──────────────────────────────────────────────
 *
 *  البنية العامة:
 *
 * AddBook (مكوّن رئيسي)
 * ├──   الحالات (States)
 * │   ├─ categories: قائمة التصنيفات المحمّلة من الخادم.
 * │   ├─ loadingCat: حالة تحميل التصنيفات.
 * │   ├─ msg: رسائل التنبيه (نجاح/خطأ).
 * │   ├─ submitting: حالة إرسال النموذج.
 * │   ├─ preview: لمعاينة صورة الغلاف قبل الإرسال.
 * │   └─ bookData: كائن يحتوي على بيانات الكتاب (العنوان، المؤلف، السعر، إلخ).
 *
 * ├──   useEffect()
 * │   └─ تحميل التصنيفات من الخادم عند أول تحميل للصفحة.
 *
 * ├──   handleChange()
 * │   ├─ يتعامل مع تغييرات جميع الحقول:
 * │   │   ├─ الحقول النصية (title, author, description, ...).
 * │   │   ├─ مربعات الاختيار (isFeatured, isOnSale).
 * │   │   └─ رفع الملفات (coverImage) + إنشاء معاينة الصورة.
 *
 * ├──   handleSubmit()
 * │   ├─ يتحقق من اكتمال الحقول المطلوبة.
 * │   ├─ يُنشئ FormData ويرسل الطلب إلى الخادم عبر fetch().
 * │   ├─ في حالة النجاح: يعرض رسالة نجاح ويعيد تعيين الحقول.
 * │   └─ في حالة الخطأ: يعرض رسالة خطأ في msg.
 *
 * ├──   واجهة النموذج (JSX)
 * │   ├─ حقول الإدخال (نصية / رقمية / وصف / تصنيف / صورة).
 * │   ├─ خيارات إضافية:
 * │   │   ├─ "مميز" → isFeatured.
 * │   │   ├─ "على الخصم" → isOnSale + discountPercent.
 * │   ├─ معاينة صورة الغلاف بعد اختيارها.
 * │   └─ زر الإرسال (مع تعطيله أثناء التحميل).
 */
import React, { usState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [categories, setCategories] = useState([]);
  const [loadingCat, setLoadingCat] = useState(true);
  const [msg, setMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);

  const { isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    isFeatured: false,
    isOnSale: false,
    discountPercent: "",
    coverImage: null,
  });

  // تحميل التصنيفات عند أول تحميل
  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated || !isAdmin) {
      navigate("/", { replace: true });
      return;
    }

    const loadCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/category/getcategory", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : data?.categories || []);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoadingCat(false);
      }
    };

    loadCategories();
  }, [loading, isAuthenticated, isAdmin, navigate]);

  // handle input changes
  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === "file") {
      const file = files?.[0] || null;
      setBookData((p) => ({ ...p, [name]: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
      return;
    }

    if (type === "checkbox") {
      setBookData((p) => ({ ...p, [name]: checked }));
      return;
    }

    setBookData((p) => ({ ...p, [name]: value }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (!isAuthenticated || !isAdmin) {
      navigate("/", { replace: true });
      return;
    }

    // التحقق من الحقول المطلوبة
    if (
      !bookData.title.trim() ||
      !bookData.author.trim() ||
      bookData.price === "" ||
      bookData.stock === "" ||
      !bookData.description.trim()
    ) {
      setMsg("All fields (title, author, price, stock, description) are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("author", bookData.author);
    formData.append("description", bookData.description);
    formData.append("price", Number(bookData.price));
    formData.append("stock", Number(bookData.stock));
    if (bookData.category) formData.append("category", bookData.category);
    formData.append("isFeatured", String(bookData.isFeatured));
    formData.append("isOnSale", String(bookData.isOnSale));
    formData.append("discountPercent", String(bookData.discountPercent || ""));
    if (bookData.coverImage) formData.append("coverImage", bookData.coverImage);

    try {
      setSubmitting(true);
      const res = await fetch("http://localhost:5000/books/createBook", {
        method: "POST",
        body: formData,
        credentials: "include",
        // ❌ لا تضف Content-Type هنا
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 401 || res.status === 403) {
        setMsg("❌ Not authorized");
        navigate("/", { replace: true });
        return;
      }

      if (!res.ok) {
        throw new Error(data?.error || "Failed to create book");
      }

      setMsg("✅ Book added successfully!");
      setBookData({
        title: "",
        author: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        isFeatured: false,
        isOnSale: false,
        discountPercent: "",
        coverImage: null,
      });
      setPreview(null);
    } catch (err) {
      setMsg("❌ Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;
  if (!isAuthenticated || !isAdmin) return null;

  return (
    <div className="max-w-2xl mx-auto p-5 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">إضافة كتاب جديد</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="عنوان الكتاب"
          value={bookData.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="author"
          placeholder="اسم المؤلف"
          value={bookData.author}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="وصف الكتاب"
          value={bookData.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="السعر"
          value={bookData.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="الكمية المتوفرة"
          value={bookData.stock}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <select
          name="category"
          value={bookData.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">اختر التصنيف</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="isFeatured"
              checked={bookData.isFeatured}
              onChange={handleChange}
            />
            مميز
          </label>

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="isOnSale"
              checked={bookData.isOnSale}
              onChange={handleChange}
            />
            على الخصم
          </label>
        </div>

        {bookData.isOnSale && (
          <input
            type="text"
            name="discountPercent"
            placeholder="نسبة الخصم (%)"
            value={bookData.discountPercent}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        )}

        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {preview && (
          <img
            src={preview}
            alt="معاينة الغلاف"
            className="w-40 h-40 object-cover mt-2 border rounded"
          />
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {submitting ? "جارٍ الإضافة" : "إضافة الكتاب"}
        </button>
      </form>

      {msg && <p className="text-center text-red-600 mt-2">{msg}</p>}
    </div>
  );
}

export default AddBook;
