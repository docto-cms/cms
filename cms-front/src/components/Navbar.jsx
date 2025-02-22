import { CircleUser } from "lucide-react";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar({ toggleSidebar, SidebarOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();


  // Handles logout process
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
  
      if (!refreshToken) {
        console.error("No refresh token found!");
        return;
      }
  
      // Send logout request with refresh token
      const response = await axios.post('http://localhost:8000/logout', {
        refresh_token: refreshToken,
      });
  
      console.log("Logout successful:", response.data);
  
      // Clear tokens from localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
  
      // Clear tokens from memory (if stored in state)
   
  
      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
  
      // Clear tokens even if logout fails (e.g., token is expired)
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    
      navigate('/login');
    }
  };

// // ✅ Helper function to read cookies
// function getCookie(name) {
//     const cookie = document.cookie
//         .split("; ")
//         .find(row => row.startsWith(name + "="));
//     return cookie ? cookie.split("=")[1] : null;
// }


  // Handles navigation
  const handleMenuClick = (item) => {
    if (item === "My Profile") {
      navigate("/doctor-profile");
    } else if (item === "Change Password") {
      navigate("/Forgot-password");
    } else if (item === "Sign Out") {
      handleLogout(); // ✅ Call logout function
    }
    setIsMenuOpen(false); // Close menu after clicking
  };

  return (
    <nav
      className={`bg-[#177e83] fixed z-50 shadow-md px-6 py-4 flex items-center justify-between transition-all duration-300 ${
        SidebarOpen ? "w-[calc(100%-16rem)]" : "w-[calc(100%-4rem)]"
      }`}
    >
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="text-white text-2xl">
        <FaBars />
      </button>

      {/* User Icon & Dropdown */}
      <div className="relative flex items-center">
        <CircleUser
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          color="white"
          className="cursor-pointer w-8 h-8"
        />
        {isMenuOpen && (
          <div className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
            {["My Profile", "Sign Out"].map((item) => (
              <div
                key={item}
                onClick={() => handleMenuClick(item)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden ml-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white text-2xl"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-800 text-white shadow-lg md:hidden flex flex-col z-50">
          {["Home", "About", "Contact"].map((item) => (
            <div
              key={item}
              className="px-6 py-4 hover:bg-blue-900 cursor-pointer transition duration-300"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
