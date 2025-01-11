import React, { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faBars,
  faSearch,
  faUser, 
  faSignOutAlt,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // Add state for showing notifications

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header
      className={`bg-white shadow-md px-4 py-3 flex items-center justify-between fixed right-0 top-0 w-full ${
        isSidebarOpen ? "lg:w-[calc(100vw_-_16rem)]" : "lg:w-full"
      } transition-all duration-300 ease-in-out z-10`}
    >
      <div className="flex items-center space-x-4">
        <button
          className={`text-gray-500 ${isSidebarOpen ? "hidden" : "block"} focus:outline-none`}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 rounded-full pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </div>

      

      {/* Right Section: Icons and Profile */}
      <div className="flex items-center space-x-4 relative">

        {/* Notifications */}
        <div className="relative">
          <button className="text-gray-500 focus:outline-none" onClick={toggleNotifications}>
            <FontAwesomeIcon icon={faBell} size="lg"/>
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              3
            </span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white from-white  to-gray-200 border border-[#168187] rounded-lg shadow-lg">
            <div className="p-3 border-b border-[#168187]">
              <h3 className="text-lg font-semibold text-[#168187]">Notifications</h3>
            </div>
            <table className="w-full text-left">
              <thead className="bg-[#168187]">
                <tr>
                  <th className="px-4 py-2 text-sm font-medium text-white">Notification</th>
                  <th className="px-4 py-2 text-sm font-medium text-white">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-[#168187]/20 transition duration-200">
                  <td className="px-4 py-3 text-gray-800">New message received</td>
                  <td className="px-4 py-3 text-gray-500">2022-01-01</td>
                </tr>
                <tr className="hover:bg-[#168187]/20 transition duration-200">
                  <td className="px-4 py-3 text-gray-800">Task assigned</td>
                  <td className="px-4 py-3 text-gray-500">2022-01-02</td>
                </tr>
                {/* Add more rows for notifications */}
              </tbody>
            </table>
            <div className="p-3 bg-[#168187]/10 text-center">
              <button className="text-[#168187] hover:text-[#168187]/80 font-medium text-sm">View all notifications</button>
            </div>
          </div>                  
          )}
        </div>
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src="https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">Thomson</span>
            {/* Arrow Icon */}
            {isDropdownOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md">
              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <Link
                    to="/profile"
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/modifier-profile"
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faCog} className="mr-2" />
                    Settings
                  </Link>
                </li>
                <li>
                  <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
