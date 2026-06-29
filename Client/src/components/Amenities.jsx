import React from "react";
import { motion } from "framer-motion";
import {
  FaUtensils,
  FaCouch,
  FaFutbol,
} from "react-icons/fa";

const amenities = [
  {
    title: "Regular Dining Space",
    icon: <FaUtensils />,
    description:
      "Beautifully curated environment for casual dining.",
  },
  {
    title: "VIP Lounge",
    icon: <FaCouch />,
    description:
      "Perfect for corporate meetings and private gatherings.",
  },
  {
    title: "Football Viewing",
    icon: <FaFutbol />,
    description:
      "Enjoy live matches on large premium screens.",
  },
];

export default function Amenities() {
  return (
    <section className="py-24 bg-[#111111] text-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Premium Amenities
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {amenities.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0px 10px 20px rgba(212,175,55,0.15)",
              }}
              className="bg-[#1A1A1A] p-8 rounded-2xl"
            >
              <div className="text-4xl text-[#D4AF37]">
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold mt-6">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}