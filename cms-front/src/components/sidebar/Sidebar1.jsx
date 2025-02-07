import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, Outlet } from "react-router-dom";
import {
  FaHome,
  FaUserCheck,
  FaUserPlus,
  FaCalendarAlt,
  FaSearch,
  FaUserMd,
  FaClinicMedical,
  FaPills,
  FaCalendarCheck,
  FaLifeRing,
  FaUsers,
} from "react-icons/fa";
import Dashboard from "@/pages/Dashboard";
import Navbar from "../Navbar";

export default function Sidebar1() {
  const [SidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex font-poppins">
      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300 ${
          SidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <Sidebar collapsed={!SidebarOpen} style={{ height: "100vh" }}>
          {/* Profile Section */}
          <div className="flex flex-col items-center pb-6 bg-teal-600 text-white transition-all duration-300">
            {SidebarOpen && (
              <h2 className="m-4 text-center text-sm font-extrabold">
                Craft Medical Poly Clinic
              </h2>
            )}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <FaUserMd className="text-teal-600 text-3xl" />
            </div>
            {SidebarOpen && (
              <>
                <h2 className="mt-4 text-center text-sm font-extrabold">
                  Dr Muhammed Iqbal VM
                </h2>
                <p className="text-center text-xs text-gray-200 font-bold">
                  Cochin
                </p>
              </>
            )}
          </div>

          {/* Menu Section */}
          <Menu className="text-black">
            {[
              { name: "Dashboard", icon: <FaHome />, path: "/" },
              { name: "Today Patient", icon: <FaUserCheck/>, path: "/today-patient" },
              { name: "Add Patients", icon: <FaUserPlus />, path: "/add-patients" },
              { name: "Quick Entry", icon: <FaUsers />, path: "/quick-entry" },
              { name: "Search Patient", icon: <FaSearch />, path: "/search-patient" },
              { name: "Appointments", icon: <FaCalendarAlt />, path: "/appointments" },
              { name: "Add Appointment",icon :<FaCalendarCheck/>, path: "/add-appointment" },
              { name: "Website Appointment", icon: <FaClinicMedical />, path: "/website-appointment" },
              // { name: "Pharmacy", icon: <FaPills />, path: "/pharmacy" },
              { name: "Support", icon: <FaLifeRing />, path: "/support" },
            ].map((item) => (
              <MenuItem
                key={item.name}
                icon={item.icon}
                onClick={() => setSelectedMenu(item.name)}
                style={{
                  backgroundColor: selectedMenu === item.name ? "#1D4ED8" : "white",
                  color: selectedMenu === item.name ? "white" : "black",
                }}
                component={<Link to={item.path} />}
              >
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </Sidebar>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-grow flex flex-col transition-all duration-300 ${
          SidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        
        <Navbar toggleSidebar={toggleSidebar} SidebarOpen={SidebarOpen} />
        {/* Main Content (Pushes down due to Navbar) */}
        <div className="flex-grow  bg-gray-100 mt-14">

          {selectedMenu === "Dashboard" && <Dashboard />}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
