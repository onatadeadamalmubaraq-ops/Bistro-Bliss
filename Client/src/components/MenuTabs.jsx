import React from "react";
import {
  FaUtensils,
  FaHamburger,
  FaDrumstickBite,
  FaBreadSlice,
  FaPizzaSlice,
  FaGlassCheers,
} from "react-icons/fa";

/* ---------------- MAIN CATEGORY ---------------- */
const mainCategories = [
  { name: "All", icon: FaUtensils },
  { name: "Local", icon: FaHamburger },
  { name: "Continental", icon: FaPizzaSlice },
];

/* ---------------- SUB CATEGORY ---------------- */
const subCategories = [
  { name: "All", icon: FaUtensils },
  { name: "Fries", icon: FaBreadSlice },
  { name: "Proteins", icon: FaDrumstickBite },
  { name: "Rice & Pasta", icon: FaUtensils },
  { name: "Pizza & Wraps", icon: FaPizzaSlice },
  { name: "Beverages", icon: FaGlassCheers },
];

export default function MenuTabs({
  activeCategory,
  setActiveCategory,
  activeSubCategory,
  setActiveSubCategory,
}) {
  return (
    <div className="space-y-6">

      {/* ---------------- MAIN CATEGORY ---------------- */}
      <div className="flex flex-wrap justify-center gap-4">

        {mainCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.name;

          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full
                font-medium transition-all duration-300 border

                ${
                  isActive
                    ? "bg-[#D4AF37] text-black shadow-lg scale-105 border-transparent"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }
              `}
            >
              <Icon />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* ---------------- SUB CATEGORY ---------------- */}
      <div className="flex flex-wrap justify-center gap-3">

        {subCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeSubCategory === cat.name;

          return (
            <button
              key={cat.name}
              onClick={() => setActiveSubCategory(cat.name)}
              className={`
                flex items-center gap-2 px-5 py-2 rounded-full
                text-sm transition-all duration-300 border

                ${
                  isActive
                    ? "bg-black text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              <Icon />
              {cat.name}
            </button>
          );
        })}
      </div>

    </div>
  );
}