import React from "react";
import { motion } from "framer-motion";

export default function OrderSummary({
  subtotal,
  deliveryFee,
}) {
  const total =
    subtotal + deliveryFee;

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">

        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>
            ₦
            {subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>

          <span>
            ₦
            {deliveryFee.toLocaleString()}
          </span>
        </div>

        <hr />

        <motion.div
          key={total}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="flex justify-between font-bold text-xl"
        >
          <span>Total</span>

          <span className="text-[#8B0000]">
            ₦
            {total.toLocaleString()}
          </span>
        </motion.div>
      </div>
    </div>
  );
}