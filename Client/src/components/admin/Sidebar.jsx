import React from "react";
import {
  FaHome,
  FaBox,
  FaClipboardList,
  FaCalendarAlt,
  FaChartBar,
  FaUtensils,
  FaMotorcycle,
  FaTimes,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const links = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <FaBox />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FaClipboardList />,
    },
    {
      name: "Reservations",
      path: "/admin/reservations",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: <FaChartBar />,
    },
    {
      name: "Kitchen",
      path: "/admin/kitchen",
      icon: <FaUtensils />,
    },
    {
      name: "Riders",
      path: "/admin/rider",
      icon: <FaMotorcycle />,
    },
  ];

  return (
    <>
      <div
        className={`fixed lg:static z-50 top-0 left-0 h-screen w-72 bg-slate-900 text-white transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-orange-500">
            Bistro Bliss
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "hover:bg-slate-800"
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}