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
} from "react-icons/fa";

export default function AdminLayout() {
const [open, setOpen] = useState(false);

const linkStyle = ({ isActive }) =>
`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-orange-500 text-white shadow"
        : "text-slate-300 hover:bg-slate-800"
    }`;

return ( <div className="min-h-screen bg-slate-100 flex">

```
  {/* SIDEBAR */}
  <aside
    className={`
      fixed lg:relative
      inset-y-0 left-0
      z-50
      w-72
      bg-slate-900
      text-white
      transform
      transition-transform
      duration-300
      ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}
  >
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

    <nav className="p-4 space-y-2">

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

    <div className="absolute bottom-5 left-4 right-4">
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

  {/* MAIN */}
  <div className="flex-1 flex flex-col min-w-0">

    {/* TOPBAR */}
    <header className="bg-white border-b h-20 px-4 md:px-8 flex items-center justify-between">

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

        <button className="relative">
          <FaBell size={20} />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
            A
          </div>

          <div className="hidden md:block">
            <p className="font-semibold">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              Bistro Bliss
            </p>
          </div>

        </div>
      </div>
    </header>

    {/* PAGE CONTENT */}
    <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
      <Outlet />
    </main>
  </div>
</div>


);
}
