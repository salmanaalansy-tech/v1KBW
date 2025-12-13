import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {Loader2} from 'lucide-react'

function AdminRoute() {
  const { user, loading, isAdmin } = useAuth();

 if (loading) {
    return <div className=" ">
          <Loader2 size={40} className="animate-spin m-auto" />
      </div>;
  }
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
