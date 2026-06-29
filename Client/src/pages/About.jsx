import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-[#FCFBF7] text-[#111]">

      {/* ================= HERO ================= */}
      <section className="relative bg-[#111] text-white py-32 overflow-hidden">

        <div className="absolute inset-0 bg-linear-to-b from-black/80 to-black/40" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            About <span className="text-[#D4AF37]">Bistro Bliss</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-white/70 max-w-3xl mx-auto"
          >
            A refined dining experience where culture, flavor, and craftsmanship meet to create unforgettable moments in Bistro Bliss.
          </motion.p>

        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="py-28">

        <div className="max-w-5xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >

            <h2 className="text-4xl md:text-5xl font-bold">
              Our Story
            </h2>

            <div className="w-24 h-0.75 bg-[#D4AF37]" />

            <p className="text-gray-700 text-lg leading-9">
              Bistro Bliss was born from a simple idea — to elevate everyday dining into a luxury experience. We blend authentic local flavors with global culinary standards to create dishes that feel both familiar and extraordinary.
            </p>

            <p className="text-gray-700 text-lg leading-9">
              Every plate is a reflection of precision, passion, and creativity. From our signature grills to handcrafted beverages, we are committed to delivering consistency, elegance, and unforgettable taste.
            </p>

          </motion.div>

        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-28 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl md:text-5xl font-bold text-center">
            What We Stand For
          </h2>

          <p className="text-center text-gray-500 mt-4 max-w-2xl mx-auto">
            The principles that define our kitchen, our service, and your experience.
          </p>

          <div className="grid md:grid-cols-3 gap-10 mt-16">

            {[
              {
                title: "Premium Quality",
                desc: "Only carefully selected ingredients make it to your plate."
              },
              {
                title: "Luxury Experience",
                desc: "We design every visit to feel elevated, calm, and memorable."
              },
              {
                title: "Cultural Fusion",
                desc: "We celebrate local heritage with modern culinary creativity."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-bold text-[#D4AF37]">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {item.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 bg-[#111] text-white text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-6"
        >

          <h2 className="text-4xl md:text-5xl font-bold">
            Experience Bistro Bliss
          </h2>

          <p className="mt-6 text-white/70 text-lg">
            Step into a world where every dish tells a story and every visit feels special.
          </p>

          <a
            href="/menu"
            className="inline-block mt-10 bg-[#D4AF37] text-black px-10 py-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            Explore Menu
          </a>

        </motion.div>

      </section>

    </div>
  );
}