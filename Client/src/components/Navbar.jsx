import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  /* ---------------- SAFE SELECTOR ---------------- */
  const items = useSelector((state) => state.cart?.items || []);

  /* ---------------- MEMOIZED TOTAL ---------------- */
  const totalItems = useMemo(() => {
    return items.reduce(
      (acc, item) => acc + (item.qty || 0),
      0
    );
  }, [items]);

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY && current > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  /* ---------------- CLOSE ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        bg-[#111111]/80 backdrop-blur-xl
        border-b border-white/10
        ${hidden ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#D4AF37]"
        >
          Bistro Bliss
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-14 text-white text-lg font-semibold">

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-[#D4AF37]"
                  : "hover:text-[#D4AF37]"
              }
            >
              {link.name}
            </NavLink>
          ))}

        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-6 text-white">

          {/* CART */}
          <Link to="/cart" className="relative">
            <FaShoppingCart size={20} />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>

        </div>

        {/* MOBILE ACTIONS */}
<div className="md:hidden flex items-center gap-4">

  <Link to="/cart" className="relative text-white">
    <FaShoppingCart size={22} />

    {totalItems > 0 && (
      <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] min-w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
        {totalItems}
      </span>
    )}
  </Link>

  <button
    onClick={() => setOpen(!open)}
    className="text-white text-xl"
  >
    {open ? <FaTimes /> : <FaBars />}
  </button>

</div>
      </div>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-white/10 ${
          open ? "max-h-100 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-5 px-6 text-white">

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-[#D4AF37] font-semibold"
                  : "hover:text-[#D4AF37]"
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <FaShoppingCart />
            <span>Cart ({totalItems})</span>
          </Link>

        </div>
      </div>
    </nav>
  );
}