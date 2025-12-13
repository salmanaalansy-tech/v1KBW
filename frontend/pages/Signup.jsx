import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BookOpen, User, Mail, Lock, Loader2 ,AlertCircle} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const { register } = useAuth();
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {


     const result= await register(form);
  if (result.success) {
        const role = result.data.user.role || "user";
        // const redirect = role === "admin" ? "/admin" : "/";

        // navigate(redirect, { replace: true });
      }

     
      // if (!res.ok) throw new Error(data?.message || "Registration Failed");

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-800 to-amber-700">
      {/* Background decorative overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/old-wall.png')]"></div>

      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 xs:w-full w-[300px] max-w-md text-white">
        <div className="flex flex-col items-center mb-8">
          <BookOpen size={48} className="text-[48]  text-amber-400 mb-3" />
          <h1 className="sm:text-3xl font-bold tracking-wide text-amber-300 text-[28px] text-center">
            Khalid Bin Walid Library
          </h1>
          <p className="text-sm text-white/70 mt-1">Your gateway to knowledge</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-amber-300/80" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={onChange}
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-white/15 border border-white/30 focus:ring-2 focus:ring-amber-400 focus:outline-none placeholder-white/60 text-black"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-amber-300/80" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-white/15 border border-white/30 focus:ring-2 focus:ring-amber-400 focus:outline-none placeholder-white/60 text-black"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-amber-300/80" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-white/15 border border-white/30 focus:ring-2 focus:ring-amber-400 focus:outline-none placeholder-white/60 text-black"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-3 mt-4 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg font-bold text-slate-900 shadow-lg hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          {error && (
            <p className="flex justify-center  gap-3 text-red-300 text-center font-semibold mt-2">
               <AlertCircle className="text-red-800 text-xl " size={25} strokeWidth={3} /> {error}
            </p>
          )}
        </form>

        <p className="text-center mt-8 text-sm text-white/70">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-amber-300 hover:text-white cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
