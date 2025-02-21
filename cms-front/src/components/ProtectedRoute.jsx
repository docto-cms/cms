import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token"); // Retrieve token from local storage
  
      if (!token) {
          console.error("No token found!");
          return false;
      }
      console.log("Token found:", token);
      
  
      try {
          const response = await axios.get("http://127.0.0.1:8000/session/", {
              headers: {
                  Authorization: `Bearer ${token}`,  // Send token in Authorization header
              },
          });
  
          console.log("Authenticated:", response.data);
          return true;
      } catch (error) {
          console.error("Authentication check failed:", error);
          return false;
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