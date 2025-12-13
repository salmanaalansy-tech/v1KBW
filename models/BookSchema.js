/**
 * 📘 خريطة ملف: BookSchema.js
 * --------------------------------------------
 * هذا الملف يحتوي على تعريف مخطط 
 * (Schema) كتاب في قاعدة بيانات 
 * MongoDB
 * باستخدام مكتبة Mongoose.
 * 
 * يحدد بنية بيانات الكتاب داخل المجموعة (Collection) ويصف الحقول وأنواعها.
 * --------------------------------------------
 *
 * 🧩 المكونات الأساسية في الملف:
 *
 * 1️⃣ الاستدعاءات (Imports)
 *    └─ mongoose : مكتبة للتعامل مع قاعدة البيانات MongoDB وإنشاء النماذج (Schemas & Models)
 *
 * 2️⃣ تعريف المخطط (BookSchema)
 *    ├─ title  — عنوان الكتاب
 *    ├─ author  — اسم المؤلف
 *    ├─  description  — وصف الكتاب
 *    ├─ price  — سعر الكتاب
 *    ├─ stock   عدد النسخ المتوفرة
 *    ├─ isFeatured   هل الكتاب مميز أو لا
 *    ├─ isOnSale   — هل الكتاب في التخفيضات أو لا
 *    ├─ discountPercent   — نسبة الخصم  
 *    ├─ category (ObjectId) — ربط الكتاب بفئة معينة من جدول الفئات (category)
 *    │     └─ يستخدم خاصية ref للإشارة إلى مخطط category
 *    └─ coverImage (String) — مسار أو اسم صورة غلاف الكتاب

 */

const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },

  discountPercent: {
    type: String,
    default: false,
  },
  // connct whith category schema
  category: {
    type: mongoose.Schema.Types.ObjectId,
    // type: String
    ref: "category",
  },
  coverImage: {
    type: String,
  },
});

module.exports = mongoose.model("Book", BookSchema);
