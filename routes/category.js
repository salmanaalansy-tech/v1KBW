/**
 * 📘 خريطة ملف: categoryRoutes.js
 * --------------------------------------------
 * هذا الملف مسؤول عن إدارة عمليات التصنيفات (Categories)
 * في واجهة الـ API باستخدام Express.
 *
 * يحتوي على المسارات الخاصة بإنشاء تصنيف جديد،
 * ويمكن توسيعه لاحقًا لإضافة جلب وتحديث وحذف التصنيفات.
 * --------------------------------------------
 *
 * 🧩 المكونات الأساسية في الملف:
 *
 * 1️⃣ الاستدعاءات (Imports)
 *    ├─ express : لإنشاء الراوتر (Router) وتنظيم المسارات
 *    ├─ category : الموديل الخاص بالتصنيفات (CategorySchema)
 *
 * 2️⃣ تعريف الراوتر (Router)
 *    └─ const router = express.Router()
 *        ⟶ يُستخدم لتعريف المسارات الخاصة بالتصنيفات
 *
 * 3️⃣ المسارات (Routes)
 *    ├─ POST /createcategory
 *    │    ├─ يستقبل اسم التصنيف (name) من جسم الطلب (req.body)
 *    │    ├─ يتحقق من أن الحقل موجود (Validation)
 *    │    ├─ ينشئ كائن تصنيف جديد new category({ name })
 *    │    ├─ يحفظ التصنيف في قاعدة البيانات (save)
 *    │    └─ يرجع رسالة نجاح + التصنيف الذي تم إنشاؤه
 *
 */

const express = require("express");
const router = express.Router();

const category = require("../models/CategorySchema");

router.post("/createcategory", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Namefiled is require" });
    }
    const newcategory = new category({
      name,
    });
    await newcategory.save();
    res.status(200).json({
      message: "category created successfully...",
      category: newcategory,
    });
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
});

router.get("/getcategory", async (req, res) => {
  try {
    const categore = await category.find();
    res.json(categore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
