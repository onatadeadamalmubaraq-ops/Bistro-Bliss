import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-24 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold">
            About Bistro Bliss
          </h2>

          <div className="w-24 h-1 bg-[#D4AF37] mt-4" />

          <p className="mt-8 text-gray-700 leading-8 max-w-4xl">
            Bistro Bliss is a luxury dining
            destination in Maiduguri and other part of the Nation,
            crafted for guests who appreciate
            exceptional cuisine,
            elegant surroundings,
            and memorable experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
}