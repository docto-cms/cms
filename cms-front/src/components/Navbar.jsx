import { CircleUser } from "lucide-react";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Navbar({ toggleSidebar, SidebarOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to handle closing when clicking outside
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`bg-blue-700 fixed z-50 shadow-md px-6 py-4 flex items-center justify-between transition-all duration-300 ${
        SidebarOpen ? "w-[calc(100%-16rem)]" : "w-[calc(100%-4rem)]"
      }`}
    >
      {/* Left Side - Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="text-white text-2xl">
        <FaBars />
      </button>

      {/* Middle - Desktop Navigation Links */}
      

      {/* Right Side - User Icon */}
      <div className="relative flex items-center">
        <CircleUser
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          color="white"
          className="cursor-pointer w-8 h-8"
        />
        {isMenuOpen && (
          <>
            <div
              onClick={closeMenus}
              className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-40"
            ></div>

            <div className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
              {["My Profile", "Change Password", "Sign Out"].map((item) => (
                <div
                  key={item}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          </>
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
        <>
          <div
            onClick={closeMenus}
            className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-40"
          ></div>
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
        </>
      )}
    </nav>
  );
}
