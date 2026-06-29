import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

export default function BranchCard({
  branch,
  onSelect,
}) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6">

      <h3 className="text-xl font-bold text-[#D4AF37]">
        {branch.name}
      </h3>

      <div className="flex items-start gap-3 mt-4">

        <FaMapMarkerAlt />

        <p>{branch.address}</p>
      </div>

      <div className="flex gap-4 mt-6">

        <a
          href={`tel:${branch.phone}`}
          className="flex items-center gap-2 px-4 py-2 bg-green-700 rounded-lg"
        >
          <FaPhone />
          Call
        </a>

        <a
          href={`https://wa.me/${branch.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 rounded-lg"
        >
          <FaWhatsapp />
          WhatsApp
        </a>

      </div>

      <button
        onClick={() =>
          onSelect(branch)
        }
        className="mt-5 w-full py-3 bg-[#D4AF37] text-black rounded-lg font-bold"
      >
        View Location
      </button>

    </div>
  );
}