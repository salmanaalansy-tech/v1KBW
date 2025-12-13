const jwt = require("jsonwebtoken");

const auth = (requiredRole = null) => {
  return (req, res, next) => {
    try {
      // 🔹 1. الحصول على التوكن من الكوكي أو من الهيدر
      let token =
        req.cookies?.token || req.headers["authorization"]?.split(" ")[1]; // يدعم الحالتين

      console.log("TOKE", token);
      if (!token) {
        return res
          .status(401)
          .json({ message: "Access denied. Token not provided." });
      }

      // 🔹 2. التحقق من صحة التوكن
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          return res.status(401).json({ message: "Invalid token." });
        }

        // 🔹 3. تخزين بيانات المستخدم في الطلب
        req.user = decoded;

        // 🔹 4. التحقق من الدور إذا تم تمريره
        if (requiredRole && decoded.role !== requiredRole) {
          return res
            .status(403)
            .json({ message: "Access denied. Insufficient permissions." });
        }

        // 🔹 5. الانتقال إلى المسار التالي
        next();
      });
    } catch (err) {
      console.error("Auth Middleware Error:", err);
      res.status(500).json({ message: "Server error during authentication." });
    }
  };
};

const cookieAuth = (req, res, next) => {
  try {
    const token =  req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token prveder" });
    }

    const decoded= jwt.verify(token,process.env.SECRET_KEY)
    req.user=decoded;
    next()
  } catch (error) {
     console.error("Auth Middleware Error:", error);
    return res.status(401).json({message:"Inviled token" })
  }
};

module.exports = {auth,cookieAuth};
