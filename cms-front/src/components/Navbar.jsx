import { CircleUser } from "lucide-react";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar, SidebarOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handles navigation
  const handleMenuClick = (item) => {
    if (item === "My Profile") {
      navigate("/doctor-profile");
    } else if (item === "Change Password") {
      navigate("/change-password");
    } else if (item === "Sign Out") {
      // Add logout logic (clear token, redirect)
      console.log("Signing out...");
    }
    setIsMenuOpen(false); // Close menu after clicking
  };

  return (
    <nav
      className={`bg-blue-700 fixed z-50 shadow-md px-6 py-4 flex items-center justify-between transition-all duration-300 ${
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
            {["My Profile", "Change Password", "Sign Out"].map((item) => (
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
