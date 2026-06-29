import React from "react";
import {
  FaBell,
  FaBars,
  FaSearch,
} from "react-icons/fa";

export default function Topbar({ setOpen }) {
  return (
    <div className="bg-white border-b px-4 md:px-6 py-4 flex items-center justify-between">

      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden"
        >
          <FaBars size={20} />
        </button>

        <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-3 py-2 w-80">
          <FaSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">

        <button className="relative">
          <FaBell size={20} />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>

          <div className="hidden md:block">
            <p className="font-semibold">Admin</p>
            <p className="text-xs text-gray-500">
              Bistro Bliss
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}