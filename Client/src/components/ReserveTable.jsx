import React, { useState } from "react";
import api from "../services/axios";
import { socket } from "../services/socket";

export default function ReserveTable() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    guests: 1,
    date: "",
    time: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/reservations", form);

      // realtime emit (optional fallback if backend doesn't emit)
      socket.emit("newReservation", res.data);

      setSuccess(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        guests: 1,
        date: "",
        time: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Reserve a Table
        </h2>

        {success && (
          <p className="text-green-600 text-center mb-4">
            Reservation submitted successfully!
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">

          <input name="name" placeholder="Full Name"
            className="border p-3 rounded"
            value={form.name} onChange={handleChange} required />

          <input name="phone" placeholder="Phone Number"
            className="border p-3 rounded"
            value={form.phone} onChange={handleChange} required />

          <input name="email" placeholder="Email (optional)"
            className="border p-3 rounded"
            value={form.email} onChange={handleChange} />

          <input name="guests" type="number" min="1"
            className="border p-3 rounded"
            value={form.guests} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4">
            <input type="date" name="date"
              className="border p-3 rounded"
              value={form.date} onChange={handleChange} required />

            <input type="time" name="time"
              className="border p-3 rounded"
              value={form.time} onChange={handleChange} required />
          </div>

          <textarea name="message" placeholder="Special request"
            className="border p-3 rounded"
            value={form.message} onChange={handleChange} />

          <button
            className="bg-black text-white p-3 rounded hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Reserve Table"}
          </button>

        </form>
      </div>
    </div>
  );
}