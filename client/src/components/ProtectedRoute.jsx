import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";

function ProtectedRoute() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:8080/api/auth/check", {
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

  if (loading) return <p>Checking authentication...</p>;
  if (!auth) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
