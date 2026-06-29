import React from "react";
import { motion } from "framer-motion";

export default function HoursSection() {
  return (
    <section className="py-24 bg-[#FCFBF7]">

      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          className="bg-white shadow-xl rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold">
            Opening Hours
          </h2>

          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-4" />

          <p className="text-5xl font-bold mt-10 text-[#D4AF37]">
            8:00 AM
          </p>

          <p className="text-xl mt-3">
            to
          </p>

          <p className="text-5xl font-bold text-[#D4AF37] mt-3">
            9:00 PM
          </p>

          <p className="mt-6 text-gray-500">
            Open Daily
          </p>
        </motion.div>
      </div>
    </section>
  );
}