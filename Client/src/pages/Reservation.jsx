import React, { useState } from "react";
import api from "../services/axios";

export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("/reservations", form);

      alert("Reservation booked successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        guests: 1,
        date: "",
        time: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to book reservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#111111]">
            Reserve a Table
          </h1>

          <p className="text-gray-500 mt-3">
            Book your table at Bistro Bliss and enjoy a premium dining experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold text-[#111111]">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-[#111111]">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-semibold text-[#111111]">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="08012345678"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block mb-2 font-semibold text-[#111111]">
              Number of Guests
            </label>

            <input
              type="number"
              name="guests"
              value={form.guests}
              onChange={handleChange}
              min="1"
              max="20"
              required
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 font-semibold text-[#111111]">
              Reservation Date
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block mb-2 font-semibold text-[#111111]">
              Reservation Time
            </label>

            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] hover:bg-[#c39c2d] text-black font-bold py-4 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Booking Reservation..." : "Reserve Table"}
          </button>
        </form>
      </div>
    </div>
  );
}