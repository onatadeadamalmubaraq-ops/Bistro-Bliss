import React from "react";
import { Link } from "react-router-dom";

export default function Failed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFBF7]">

      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-xl">

        <h1 className="text-4xl font-bold text-red-600">
          Payment Failed ❌
        </h1>

        <p className="mt-4 text-gray-600">
          Something went wrong during payment. Please try again.
        </p>

        <Link
          to="/checkout"
          className="inline-block mt-6 bg-[#8B0000] text-white px-6 py-3 rounded-lg font-bold"
        >
          Retry Payment
        </Link>

      </div>
    </div>
  );
}