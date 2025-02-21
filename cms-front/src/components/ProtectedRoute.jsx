import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // ✅ Send a request to the backend to check authentication
        await axios.get("http://127.0.0.1:8000/auth-check/", { withCredentials: true });
        setIsAuthenticated(true); // User is authenticated
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false); // User is not authenticated
      }
    };

    checkAuth(); // Call the function to check authentication
  }, []);

  // ✅ Show a loader while checking authentication status
  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  // ✅ Render the protected route if authenticated, otherwise redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;