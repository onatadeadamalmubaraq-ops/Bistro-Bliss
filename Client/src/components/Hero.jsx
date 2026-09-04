import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4')",
        }}
      />

      <div className="absolute inset-0 bg-black/75" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex flex-col justify-center"
      >
        <motion.p
          variants={item}
          className="text-[#D4AF37] uppercase tracking-[6px]"
        >
          Premium Restaurant
        </motion.p>

        <motion.h1
          variants={item}
          className="text-white text-5xl md:text-7xl font-bold mt-5 max-w-4xl"
        >
          Taste Excellence
          <span className="text-[#D4AF37] block">
            At Bistro Bliss
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-gray-300 mt-6 max-w-2xl text-lg"
        >
          Experience luxurious dining,
          authentic flavours,
          premium hospitality,
          and unforgettable moments
          in Bistro Bliss.
        </motion.p>

        <motion.div
          variants={item}
          className="flex gap-4 mt-8 flex-wrap"
        >
          <Link
            to="/menu"
            className="px-8 py-4 bg-[#D4AF37] text-black rounded-lg font-semibold hover:scale-105 transition"
          >
            Explore Menu
          </Link>

          <Link
            to="/reservation"
            className="px-8 py-4 border border-[#D4AF37] text-white rounded-lg hover:bg-[#D4AF37] hover:text-black transition"
          >
            Reserve Table
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}