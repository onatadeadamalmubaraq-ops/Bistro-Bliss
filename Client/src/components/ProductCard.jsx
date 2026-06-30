import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-hot-toast";

export default function ProductCard({
  product
}) {
  const dispatch = useDispatch();

 const handleAdd = () => {
    dispatch(addToCart(product));

    toast.success(`${product.name} added to cart`, {
      duration: 3500,
    });
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow:
          "0px 10px 20px rgba(212,175,55,0.15)"
      }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg"
    >
      <img
     src={`${import.meta.env.VITE_API_URL}${product.image}`}
     alt={product.name}
     className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="font-bold text-xl">
          {product.name}
        </h3>

        

        <div className="flex justify-between items-center mt-5">
          <span className="font-bold text-[#8B0000]">
            ₦{product.price.toLocaleString()}
          </span>

          <motion.button
            whileTap={{
              scale: 1.2
            }}
            onClick={handleAdd}
            className="bg-[#D4AF37] px-4 py-2 rounded-lg font-semibold"
          >
            Order
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}