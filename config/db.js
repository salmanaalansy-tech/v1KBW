/**
 * ===============================================================
 * 📦 File: dbConnect.js
 * 📁 Location: root or /config/dbConnect.js
 * 🧭 Purpose:
 *    This file handles connecting the Node.js application to MongoDB
 *    using Mongoose.
 *
 * ===============================================================
 * 🧱 Dependencies:
 *  - mongoose: ODM (Object Data Modeling) library for MongoDB.
 *
 * ===============================================================
 * 🚀 Function Overview:
 *
 * 1️⃣  connectDB()
 *     - Purpose: Establish connection to MongoDB.
 *     - Steps:
 *        1. Uses mongoose.connect() with the connection string
 *           from environment variable: process.env.MONGO_URL
 *        2. If connection succeeds → log "connected successfully...!"
 *        3. If connection fails → log "connected failed"
 *     - Notes:
 *        - This function should be called once when the server starts.
 *        - It uses async/await syntax for handling asynchronous behavior.
  ===============================================================
  */

const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("connected sucssfully...!"))
    .catch((error) => {
      console.log(`connected felde ${error}`);
    });
};

module.exports = connectDB;
