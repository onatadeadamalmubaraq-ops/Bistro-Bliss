import React, { useEffect, useMemo, useState } from "react";
import api from "../services/axios";

import MenuTabs from "../components/MenuTabs";
import MenuGrid from "../components/MenuGrid";

export default function Menu() {
  const [products, setProducts] = useState([]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/products");
      setProducts(Array.isArray(res.data) ? res.data : res.data.products || []);
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchSubCategory =
        activeSubCategory === "All" || item.subCategory === activeSubCategory;

      return matchCategory && matchSubCategory;
    });
  }, [products, activeCategory, activeSubCategory]);

  return (
    <div className="min-h-screen bg-[#FCFBF7]">
      <section className="bg-[#111111] py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-white">Our Menu</h1>
          <p className="text-gray-400 text-2xl font-semibold mt-5">
           customer's Favorites
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <MenuTabs
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeSubCategory={activeSubCategory}
          setActiveSubCategory={setActiveSubCategory}
        />

        <div className="mt-14">
          <MenuGrid products={filteredProducts} />
        </div>
      </section>
    </div>
  );
}