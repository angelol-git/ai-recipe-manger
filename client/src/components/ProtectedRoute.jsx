import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api.js";

function ProtectedRoute() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/check`, {
          credentials: "include",
        });
        setAuth(res.ok);
      } catch (err) {
        console.log(`Error auth check: ${err}`);
        setAuth(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) return null;
  if (!auth) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
