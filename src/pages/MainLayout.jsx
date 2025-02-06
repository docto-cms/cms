import React, { useState } from 'react';
import Sidebar1 from '../components/sidebar/Sidebar1';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//  handleToggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev)
//  }

  return (
    <div className="flex">
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-64 h-screen fixed top-0 left-0 text-white">
          <Sidebar1 />
        </aside>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        <header className="p-4 bg-gray-100 flex justify-between items-center">
       
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
