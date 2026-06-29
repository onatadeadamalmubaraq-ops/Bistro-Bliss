import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import CartItem from "../components/CartItem";

export default function Cart() {
  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <h1 className="text-5xl font-bold">
        Shopping Cart
      </h1>

      <div className="mt-10 space-y-6">

        {/* EMPTY STATE / LIST */}
        {cartItems.length === 0 ? (
          <p className="text-gray-500">
            Your cart is empty.
          </p>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
            />
          ))
        )}

        {/* CHECKOUT BUTTON */}
        {cartItems.length > 0 && (
          <Link
            to="/checkout"
            className="inline-block mt-10 bg-[#D4AF37] px-8 py-4 rounded-lg font-bold"
          >
            Proceed To Checkout
          </Link>
        )}

      </div>
    </div>
  );
}