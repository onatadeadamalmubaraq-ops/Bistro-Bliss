import React from "react";
export default function Footer() {
  return (
    <footer className="bg-black text-white">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-10">

          <div>

            <h3 className="text-2xl font-bold text-[#D4AF37]">

              Bistro Bliss

            </h3>

            <p className="mt-4 text-gray-400">

              Luxury dining experience in Bistro Bliss.

            </p>

          </div>

          <div>

            <h4 className="font-bold">

              Opening Hours

            </h4>

            <p className="mt-3">

              Daily

            </p>

            <p>
              8:00 AM - 9:00 PM
            </p>

          </div>

          <div>

            <h4 className="font-bold">

              Contact

            </h4>

            <p className="mt-3">

              +2348012345678

            </p>

            <p>

              info@bistrobliss.com

            </p>

          </div>

        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-center text-gray-500">

          © 2026 Bistro Bliss.
          All rights reserved.

        </p>

      </div>
    </footer>
  );
}