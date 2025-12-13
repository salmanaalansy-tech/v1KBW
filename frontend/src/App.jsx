 
import {Loader2} from "lucide-react"
 import './App.css'
import Header from "../componentes/Header";

import OnSaleProducts from "../componentes/OnSaleProducts";
import FeaturedProducts from "../componentes/FeaturedProducts";
import About from "../componentes/About";

import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

import { AuthProvider } from "../auth/AuthContext";
import { CartProvider } from "../auth/CartContext";
import AdminRoute from "../Admin/AdminRoute";

// Lazy load الصفحات
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const CartPage = lazy(() => import("../pages/CartPage"));
const BookDetails = lazy(() => import("../pages/BookDetails"));

// Admin pages
const AdminLayout = lazy(() => import("../Admin/AdminLayout"));
const AddBook = lazy(() => import("../Admin/AddBook"));
const AllBooks = lazy(() => import("../Admin/AllBooks"));
const UpdateBook = lazy(() => import("../Admin/UpdateBook"));

function App() {
  const location = useLocation();
  const hideHeader = /^\/admin(\/|$)/.test(location.pathname);

  return (
    <AuthProvider>
      <CartProvider>
        {!hideHeader && <Header />}

        <Suspense
          fallback={
            <div className="text-center mt-20">
              {" "}
            
              <Loader2 size={40} className="animate-spin  my-28 mx-auto" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/bookDetails/:id" element={<BookDetails />} />

            <Route path="/on-sale-products" element={<OnSaleProducts />} />
            <Route path="/featured-products" element={<FeaturedProducts />} />
            <Route path="/about" element={<About />} />
           
            {/* Admin protected routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="all-books" element={<AllBooks />} />
                <Route path="add-book" element={<AddBook />} />
                <Route path="/admin/update-book/:id" element={<UpdateBook />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;


 
// import './App.css'

// function App() {
  

//   return (
//     <h1 class="text-3xl font-bold text-blue-50">Tailwind v3 تعمل!</h1>
//   )
// }

// export default App
