import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Breadcrumbs from "./BreadCrumbs";
import SideBar from "./SideBar";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Set the default state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true); // Default open for `lg` and larger
      } else {
        setIsSidebarOpen(false); // Default closed for smaller screens
      }
    };

    // Initial check on mount
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen admin">
      {/* Sidebar */}
      <div
        className={` fixed top-0 ${
          isSidebarOpen ? "left-0" : "-left-64"
        } bg-gray-800 text-white w-64 h-screen z-30 transition-all duration-300 ease-in-out`}
      >
        {/* <SideBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} /> */}
        <SideBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <div className={`flex-1 ml-0 ${isSidebarOpen && "lg:ml-64"}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="p-4 bg-gray-100 min-h-screen mt-[60px] transition-all duration-300 ">
          <div className="mt-4 ml-6">
            <Breadcrumbs />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
