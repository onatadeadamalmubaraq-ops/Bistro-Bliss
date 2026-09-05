import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaBox,
  FaClipboardList,
  FaUtensils,
  FaMotorcycle,
  FaCalendarAlt,
  FaChartBar,
  FaSignOutAlt,
  FaBell,
  FaTimes,
  FaSearch,
  FaUserPlus,
} from "react-icons/fa";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-orange-500 text-white shadow"
        : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72
          bg-slate-900 text-white z-50
          transform transition-transform duration-300
          flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-orange-500">
            Bistro Bliss
          </h1>

          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={linkStyle}
            onClick={() => setOpen(false)}
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={linkStyle}
            onClick={() => setOpen(false)}
          >
            <FaBox />
            Products
          </NavLink>

          <NavLink
            to="/admin/register"
            className={linkStyle}
            onClick={() => setOpen(false)}
          >
            <FaUserPlus />
            Register Staff
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={linkStyle}
            onClick={() => setOpen(false)}
          >
            <FaClipboardList />
            Orders
          </NavLink>

          <NavLink
            to="/admin/reservations"
            className={linkStyle}
            onClick={() => setOpen(false)}
          >
            <FaCalendarAlt />
            Reservations
          </NavLink>

          <NavLink
            to="/admin/analytics"
            className={linkStyle}
            onClick={() => setOpen(false)}
          >
            <FaChartBar />
            Analytics
          </NavLink>

          <NavLink
            to="/admin/kitchen"
            className={linkStyle}
            onClick={() => setOpen(false)}
          >
            <FaUtensils />
            Kitchen
          </NavLink>

          <NavLink
            to="/admin/rider"
            className={linkStyle}
            onClick={() => setOpen(false)}
          >
            <FaMotorcycle />
            Riders
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col lg:ml-72 min-h-screen">
        {/* TOPBAR */}
        <header className="bg-white border-b h-20 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setOpen(true)}
            >
              <FaBars size={22} />
            </button>

            <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-80">
              <FaSearch className="text-slate-500" />

              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none ml-3 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button>
              <FaBell size={20} />
            </button>

            <div className="hidden md:block">
              <p className="font-semibold">Admin</p>

              <p className="text-xs text-slate-500">
                Bistro Bliss
              </p>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}