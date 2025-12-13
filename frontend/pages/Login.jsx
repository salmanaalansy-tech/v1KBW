/**
 * ================================================================
 * 🌟 Login Page — Khalid Bin Al-Waleed Library
 * ------------------------------------------------
 * Modern, elegant and user-focused login design
 * Built with React + Tailwind + Lucide Icons + Framer Motion
 * ------------------------------------------------
 * Author: SalmanSoft UI Team
 * ================================================================
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Loader2,
  LogIn,
  Mail,
  Lock,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../auth/AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const { login } = useAuth(); // ⬅️ استدعاء login من AuthContext

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ⬅️ استدعاء login من AuthContext بدل كتابة fetch هنا
    const result = await login(form);

    try {
      if (result.success) {
        const role = result.data.user.role || "user";
        const redirect = role === "admin" ? "/admin/all-books" : "/";

        navigate(redirect, { replace: true });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-50 px-6 ">
      {/* Logo Section */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-3 mb-10"
        >
     
          <BookOpen className="text-amber-600" size={40} />

          
          <h1
            className="
        font-bold tracking-wide text-slate-800
        text-[22px] sm:text-3xl md:text-4xl
      "
          >
            Khalid Bin Al-Waleed Library
          </h1>
        </motion.div>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 border border-yellow-100"
      >
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6 flex items-center justify-center gap-2">
          <LogIn className="text-amber-500" /> Login
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail
              size={20}
              className="absolute left-3 top-3 text-amber-500 opacity-80"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              required
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={20}
              className="absolute left-3 top-3 text-amber-500 opacity-80"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              required
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none transition-all"
            />
          </div>

          {/* Submit Button */}

          {/* <Link to="/"> */}
          <button
            // onClick={()=> <a href="/"/> }
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Login
              </>
            )}
          </button>

          {/* </Link> */}
          {/* Error Message */}
          {error && (
            <p className="flex items-center gap-2 text-red-500 text-sm font-semibold mt-3">
              <AlertCircle size={18} /> {error}
            </p>
          )}
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?
          <span
            onClick={() => navigate("/signup")}
            className="text-amber-600 font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </motion.div>

      {/* Decorative glow */}
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-200 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full blur-3xl opacity-40"></div>
    </div>
  );
}

export default Login;
