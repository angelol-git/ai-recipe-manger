import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("http://localhost:8080/api/auth/check", {
        credentials: "include",
      });
      setAuth(res.ok);
    }
    checkAuth();
  }, []);

  if (!auth) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
