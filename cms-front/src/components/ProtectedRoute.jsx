import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token"); // ✅ Only using access token

      if (!token) {
        console.error("No access token found!");
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/session/", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Only sending the access token
          },
        });

        console.log("Authenticated:", response.data);
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
