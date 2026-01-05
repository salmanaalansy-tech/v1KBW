/**
 * 🚀 خريطة ملف: server.js
 * --------------------------------------------
 * هذا الملف هو نقطة تشغيل التطبيق (Entry Point)
 * مسؤول عن إعداد الخادم وربطه بقاعدة البيانات
 * وتهيئة المسارات (Routes) والتعامل مع الطلبات من الواجهة الأمامية.
 * --------------------------------------------
 */

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
// const env = require("env").config();
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// 🧩 CORS إعداد
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



// 🧩 ربط قاعدة البيانات
connectDB();

// // قراه

app.use(cookieParser());

// 🧩 Middleware عام
app.use(express.json());



// 🧩 المسارات
app.use("/users", require("./routes/users"));
app.use("/books", require("./routes/books"));
app.use("/category", require("./routes/category"));
app.use("/admin", require("./routes/admin"));
app.use('/carts',require('./routes/carts'))

// 🧩 جعل الصور متاحة للواجهة الأمامية
app.use("/images", express.static(path.join(__dirname, "images")));

// 🧩 تشغيل الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
