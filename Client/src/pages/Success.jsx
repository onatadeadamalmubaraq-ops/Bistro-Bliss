import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();

  const order = state?.order;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFBF7]">

      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-xl">

        <h1 className="text-4xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>

        <p className="mt-4 text-gray-600">
          Your order has been received and is being processed.
        </p>

        {order && (
          <div className="mt-6 text-left bg-gray-100 p-4 rounded-lg">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ₦{order.total}</p>
            <p><strong>Status:</strong> {order.paymentStatus}</p>
          </div>
        )}

        <Link
          to="/menu"
          className="inline-block mt-6 bg-[#D4AF37] px-6 py-3 rounded-lg font-bold"
        >
          Back to Menu
        </Link>

      </div>
    </div>
  );
}