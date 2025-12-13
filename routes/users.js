/**
 * ===============================================================
 * 🧱 Dependencies:
 *  - express: For routing and handling HTTP requests.
 *  - bcrypt: For encrypting (hashing) user passwords.
 *  - jsonwebtoken (jwt): For generating and verifying access tokens.
 *  - User (../models/UserSchema): Mongoose model for user data in MongoDB.
 *
 * ===============================================================
 * 🚀 Routes Overview:
 *
 * 1️⃣  POST /register
 *     - Purpose: Register a new user.
 *     - Steps:
 *        1. Validate that `email`, `password`, and `name` are provided.
 *        2. Check if user already exists in the database.
 *        3. Hash the password using bcrypt.
 *        4. Save the new user in MongoDB.
 *        5. Generate a JWT token (valid for 1 week).
 *     - Response:
 *        { message, user, token }
 *
 * ---------------------------------------------------------------
 *
 * 2️⃣  POST /signin
 *     - Purpose: Log in an existing user.
 *     - Steps:
 *        1. Validate that `email` and `password` are provided.
 *        2. Check if user exists.
 *        3. Compare provided password with the hashed one.
 *        4. Generate a JWT token (valid for 1 week) if valid credentials.
 *     - Response:
 *        { message, user, token }
 *
 * ---------------------------------------------------------------
 *
 * 3️⃣  GET /:id
 *     - Purpose: Get user details by ID.
 *     - Steps:
 *        1. Find user in database using ID from request params.
 *        2. If user not found → 404.
 *        3. Else return user data.
 *     - Response:
 *        { IdUser }
 *
 * ===============================================================
 * ⚙️ Token Logic:
 *   - JWT is used to keep the user logged in without needing to log in again.
 *   - Token payload includes: { email, id }.
 *   - Secret key comes from environment variable: process.env.SECRET_KEY.
 *   - Token expiration: 1 week.
 */

const express = require("express");
const User = require("../models/UserSchema");
// ues to get user token
// token يجعل المستخدم يسجل الايميل فقط مره واحده وفي المر ه الثانيه يجعل المستخدم يسجل بدون تسجيل من جديد
const jwt = require("jsonwebtoken");
// encribtion
const bcrypt = require("bcrypt");
const { cookieAuth } = require("../auth/middleware");
// use to move between pages
const router = express.Router();

router.post("/register", async (req, res) => {
  // console.log("Body received:", req.body);

  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Email, password & name are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashdPassword = await bcrypt.hash(password, 10);

    // defult role ===user
    const newUser = new User({
      email,
      password: hashdPassword,
      name,
      role: "user",
    });
    await newUser.save();

    let token = await jwt.sign(
      { email, id: newUser._id, role: newUser.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1w",
      }
    );

    // save info users in cockise why not use localStorge or soctionStorge?
    res.cookie("token", token, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      // age sing after طلب تسجيل الدخوال مره اخرى
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token,
      role: newUser.role,
    });
  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/signin", async (req, res) => {
  const { password, email } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email, password & name are required" });
  }
  let user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // when uwer rolre ==user or admin
    const role = user.role || "user";

    let token = await jwt.sign(
      { email, id: user._id, role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1w",
      }
    );

    // save info users in cockise why not use localStorge or soctionStorge?
    res.cookie("token", token, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      // age sing after طلب تسجيل الدخوال مره اخرى
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // when user == admin  go to admin paes
    const redirectPath = role === "admin" ? "/admin" : "/";
    return res.status(201).json({
      message: "User Singnin successfully",
      user: user,
      token,
      role,
      redirect: redirectPath,
    });
  } else {
    return res.status(400).json({ message: "Invalid email or password" });
  }
});

// يتحقق من وجواد التوكن

router.get("/verify", cookieAuth, async (req, res) => {
  try {
    // 1. تأكد من أن الـ middleware أعطاك بيانات صحيحة
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // 2. جلب معلومات المستخدم
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    // 3. الرد النهائي
    return res.status(200).json({
      message: "Token valid",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Verify error:", error);
    return res.status(500).json({ message: "Server error during verify" });
  }
});


// logout 
router.post("/logout", async (req,res)=>{
  res.clearCookie("token",{
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"lax",
  })
  res.status(200).json({message:"Logged out succefully"})
})





router.get("/:id", async (req, res) => {
  const IdUser = await User.findById(req.params.id);

  if (!IdUser) {
    return res.status(404).json({ message: "User Not Found" });
  }
  return res.status(200).json({ IdUser });
});

module.exports = router;
