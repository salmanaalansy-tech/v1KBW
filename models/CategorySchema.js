/**
 * 2️⃣ تعريف المخطط (CategorySchema)
 *    └─ name (String, مطلوب) — اسم التصنيف (مثلاً: رواية، تعليم، تكنولوجيا)
 */

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("category", CategorySchema);
