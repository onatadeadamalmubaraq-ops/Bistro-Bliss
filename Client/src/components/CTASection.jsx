import React from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-24 bg-[#8B0000]">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-white text-5xl font-bold">
          Ready To Order?
        </h2>

        <p className="text-white/80 mt-5">
          Browse our delicious menu and
          enjoy premium dining from anywhere.
        </p>

        <Link
          to="/menu"
          className="inline-block mt-8 px-10 py-4 bg-[#D4AF37] text-black font-bold rounded-xl hover:scale-105 transition"
        >
          Order Now
        </Link>
      </div>
    </section>
  );
}