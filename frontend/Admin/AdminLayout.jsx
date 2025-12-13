import { useState,useRef ,useEffect } from "react";
import { MenuIcon , X, BookOpen, Plus, Home } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
 
 
function AdminLayout() {
  const [open, setOpen] = useState(false);
const sidebarRef = useRef(null);
   useEffect(() => {
    function handleClickOutside(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Header */}
      <header className="fixed  left-[0px]   w-[100%] top-0 flex items-center justify-between px-4 z-40 h-14 shadow-lg bg-white ">
        <h4 className="font-bold text-lg">Admin Panel</h4>
        
      
        <button
          className="menu  w-20 h-10 flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
        </button>
      </header>

      {/* Layout Wrapper */}

      <div className="relative  flex flex-1">
        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={` fixed  top-0 left-0 h-full flex flex-col bg-slate-900 w-[260px] text-slate-100 duration-500 z-30 transform
            ${open ? "translate-x-0" : "-translate-x-full "}`}
        >
     
       

          <nav className="flex-1 space-y-3 p-4">
            <NavLink
              to={"/admin/all-books"}
              className={`flex items-center mt-14 gap-2 hover:bg-slate-800 p-2 rounded-md`}
            >
              <BookOpen className="h-6 w-6 " />
              <span>All Book</span>
            </NavLink>

            <NavLink
              to={"/admin/add-book"}
              className={`flex items-center gap-2 hover:bg-slate-800 p-2 rounded-md`}
            >
              <Plus className="h-6 w-6 " />
              <span>Add Book</span>
            </NavLink> 

            <NavLink
              to={"/"}
              className={`flex items-center gap-2 hover:bg-slate-800 p-2 rounded-md`}
            >
              <Home className="h-6 w-6 " />
              <span>Home</span>
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto bg-slate-50 z-10">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
