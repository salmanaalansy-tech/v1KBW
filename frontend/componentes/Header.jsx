import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../auth/CartContext";
 
import {
  ShoppingBasket,
  Heart,
  LogOut,
  LayoutDashboard,
  MenuIcon,
  X,
} from "lucide-react";

function Header() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { cart } = useCart();
  const totalItems =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "On Sale", path: "/on-sale-products" },
    { name: "Featured Products", path: "/featured-products" },
    { name: "About", path: "/about" },
  ];

  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const renderUserActions = () => {
    if (!isAuthenticated) {
      return (
        <div className="hidden xl:flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 border border-red-500 text-red-500 rounded-lg shadow hover:bg-red-50 transition"
          >
            Signup
          </button>
        </div>
      );
    }

    return (
      <div className="hidden xl:flex items-center gap-6 ">
        {/* User Name */}
        <div className="group relative">
          {isAuthenticated && (
            <span className="text-gray-700 text-sm  font-bold  cursor-pointer">
              Welcome {user?.name}
            </span>
          )}
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300 rounded" />
        </div>
        {isAdmin ? (
          <button
            onClick={() => navigate("/admin/all-books")}
            className="relative group px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
          >
            <LayoutDashboard />
            <span className="absolute w-[150px] -bottom-9 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-gray-900 bg-white rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none  ">
              Manage Dashboard
            </span>
          </button>
        ) : (
          <>
            {/* Cart Icon */}
            <div className="relative group">
              <Link to="/cart" className="p-2">
                <ShoppingBasket className="w-6 h-6 text-gray-700" />
              </Link>
              {totalItems > 0 && (
                <div className="absolute top-3 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 shadow-lg transition-all duration-300">
                  {totalItems}
                </div>
              )}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                Cart
              </span>
            </div>

            {/* Wishlist Icon */}
            <div className="relative group">
              <Heart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-red-500 transition" />
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                Wishlist
              </span>
            </div>
          </>
        )}

        <button
          onClick={handleLogout}
          className="relative group px-5 py-2 bg-red-500 text-gray-700 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            Logout
          </span>
        </button>
      </div>
    );
  };

  return (
    <div className=" mb-24  xl:mb-28 ">
      <nav
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-500 
          backdrop-blur-xl 
          ${
            isScrolled
              ? "bg-white/60 border-b border-white/20 shadow-lg"
              : "bg-white/10 border-b border-transparent"
          }
        `}
      >
        {" "}
        {/* Desktop Header */}
        <div
          className={`
            hidden xl:flex items-center justify-between px-16 transition-all duration-500
            ${isScrolled ? "py-3" : "py-6"}
          `}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="logo/images.jpg"
              alt="Khalid bin Al-Walid Library"
              className="h-[120px]  object-contain"
            />
          </Link>
          

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="relative group font-medium text-gray-700 hover:text-gray-900 transition"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300 rounded" />
              </Link>
            ))}
          </div>

          {/* User Actions */}
          {renderUserActions()}
        </div>
        {/* Mobile Header */}
        <div
          className={`
            flex xl:hidden items-center justify-between px-4 transition-all duration-500
            ${isScrolled ? "py-2" : "py-4  bg-white"}
          `}
        >
          {" "}
          {/* Logo / Home */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo/images2.jpg"
              alt="Home"
              className="h-18 object-contain"
            />
          </Link>
          {/* Right Section */}
          <div className="flex items-center  gap-4 ">
            {/* User name */}
            <div className="group relative">
              {isAuthenticated && (
                <span className="text-gray-700 text-sm  font-bold  cursor-pointer">
                  Welcome {user?.name}
                </span>
              )}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300 rounded" />
            </div>
            {/* Cart */}
            {isAdmin ? (
              ""
            ) : (
              <>
                <div className="relative group">
                  <Link to="/cart" className="p-2">
                    <ShoppingBasket className="w-6 h-6 text-gray-700" />
                  </Link>
                  {totalItems > 0 && (
                    <div className="absolute top-3 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 shadow-lg transition-all duration-300">
                      {totalItems}
                    </div>
                  )}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    Cart
                  </span>
                </div>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded hover:bg-gray-100 transition"
            >
              <MenuIcon className="w-7 h-7  md:w-8 h-8" />
            </button>
          </div>
        </div>
        {/* BACKDROP */}
        {isMenuOpen && (
          <div
            onClick={() => setIsMenuOpen(false)}
            className=" fixed inset-0 h-screen bg-black/40 backdrop-blur-md z-40  xl:hidden"
          ></div>
        )}
        {/* Mobile Menu */}
        <div
          className={`fixed mt-52 z-50 top-1/2 left-1/2 w-[320px] max-w-[90%] 
    -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl 
    p-8 flex flex-col items-center gap-6 font-medium text-gray-800
    transition-all duration-500  xl:hidden
    ${
      isMenuOpen
        ? "scale-100 opacity-100 "
        : "scale-50 opacity-0 pointer-events-none "
    }
  `}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close Menu"
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-red-400 transition"
          >
            <X className="w-6 h-6 hover:-rotate-45 transition-all " />
          </button>

          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium hover:text-red-600 transition"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex gap-4 mt-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                  className="px-5 py-2 border border-red-500 text-red-500 rounded-lg shadow hover:bg-red-50 transition"
                >
                  Signup
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="relative group px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <LogOut />
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => navigate("/admin/all-books")}
                className="relative group px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
              >
                <LayoutDashboard />
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
