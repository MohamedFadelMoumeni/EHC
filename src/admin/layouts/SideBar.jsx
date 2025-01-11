import React from "react";
import { NavLink } from "react-router-dom";
import {
  Info,
  Newspaper,
  Gift,
  Video,
  Briefcase,
  Calendar,
  CreditCard,
  LayoutDashboard,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Utility function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Menu Items Data
const menuItems = [
  {
    name: "about",
    label: "À Propos",
    icon: Info,
    color: "text-[#168187]",
    link: "/admin/about",
  },
  {
    name: "news",
    label: "Actualités",
    icon: Newspaper,
    color: "text-[#168187]",
    link: "/admin/news",
  },
  {
    name: "services",
    label: "Services",
    icon: Gift,
    color: "text-[#168187]",
    link: "/admin/services",
  },
  {
    name: "media",
    label: "Médias",
    icon: Video,
    color: "text-[#168187]",
    link: "/admin/media",
  },
  {
    name: "career",
    label: "Carrière",
    icon: Briefcase,
    color: "text-[#168187]",
    link: "/admin/career",
  },
  {
    name: "contact",
    label: "Contact",
    icon: Calendar,
    color: "text-[#168187]",
    link: "/admin/contacts",
  },
  {
    name: "payment",
    label: "Paiement",
    icon: CreditCard,
    color: "text-[#168187]",
    link: "/admin/payment",
  },
];

// Sidebar Component
const SideBar = ({ toggleSidebar }) => {
  return (
    <div className="sidebar w-64 bg-[#168187] text-white h-full flex flex-col shadow-lg">
      <div className="p-4 flex items-center justify-between mb-6 border-b border-[#0e5e5e]">
        <h2 className="text-xl font-bold tracking-wider flex items-center gap-2 text-white"><LayoutDashboard className="h-5 w-5 text-white" />Dashboard</h2>
        <FontAwesomeIcon
          icon={faXmark}
          className="ml-auto w-5 h-5 cursor-pointer bg-transparent text-white hover:text-gray-200 transition-all duration-300 ease-in-out"
          onClick={toggleSidebar}
        />
      </div>
      <div className="flex-1 overflow-auto space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.link}
            className={({ isActive }) => {
              return cn(
                "flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 ease-in-out",
                isActive
                  ? "bg-white text-[#168187] shadow-inner"
                  : "text-white hover:text-[#d9f2f2] hover:bg-[#0e5e5e]"
              );
            }}>
            {({ isActive }) => (
              <>
                <item.icon className={cn("h-5 w-5", isActive ? "text-[#168187]" : "text-white")} />
                <span className="text-sm font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
      <div className="p-4 text-center text-[#d9f2f2] text-xs border-t border-[#0e5e5e]">
        © 2024 Your Company
      </div>
    </div>
  );
};

export default SideBar;
