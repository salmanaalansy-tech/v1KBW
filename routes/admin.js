const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Book = require("../models/BookSchema");

const { auth,cookieAuth } = require("../auth/middleware");

// 📁 تحديد مجلد الصور وإنشاؤه إذا لم يكن موجودًا
const imageDir = path.join(__dirname, "../images");
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// 📤 إعداد multer لتخزين الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // الامتداد الصحيح
    const fileName = Date.now() + "-" + file.fieldname + ext;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// ➕ إنشاء كتاب جديد

router.post(
  "/createBook",
  cookieAuth,
  auth("admin"),
  upload.single("coverImage"),
  async (req, res) => {
    try {
      const {
        title,
        author,
        description,
        price,
        stock,
        isFeatured,
        isOnSale,
        discountPercent,
        category,
      } = req.body;

      if (!title || !author || !description || !price || !stock) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const newBook = new Book({
        title,
        author,
        description,
        price,
        stock,
        isFeatured,
        isOnSale,
        discountPercent,
        category,
        coverImage: req.file?.filename, // حفظ اسم الملف الصحيح
      });

      await newBook.save();
      res
        .status(200)
        .json({ message: "Book created successfully", book: newBook });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// 📖 جلب جميع الكتب
router.get("/getBooks", cookieAuth, auth("admin"), async (req, res) => {
  try {
    const books = await Book.find().populate("category", "name");
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📖 جلب كتاب حسب الـ ID
router.get("/:id", auth("admin"), async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✏️ تحديث كتاب
router.put("/updateBook/:id", auth("admin"), async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("category", "name");
    if (!book)
      return res.status(404).json({ message: "Book not found to update" });
    res.json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ❌ حذف كتاب
router.delete("/deleteBook/:id", auth("admin"), async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book)
      return res.status(404).json({ message: "Book not found to delete" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
