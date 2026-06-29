import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function MenuGrid({
  products
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={products.length}
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-8"
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}