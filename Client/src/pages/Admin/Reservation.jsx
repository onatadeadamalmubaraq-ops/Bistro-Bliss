import React, { useEffect, useState } from "react";
import api from "../../services/axios";
import { FaTrash } from "react-icons/fa";

export default function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await api.get("/reservations");
      setReservations(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReservation = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservation?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete (`/reservations/${id}`);

      setReservations((prev) =>
        prev.filter((reservation) => reservation._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete reservation.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Reservations
        </h1>

        <p className="text-slate-500 mt-2">
          Manage all customer table reservations.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6 overflow-x-auto">
        {loading ?(
          <div className="text-center py-10 text-slate-500">
            Loading reservations...
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            No reservations found.
          </div>
        ) : (
            <table className="w-full table-auto">            <thead>
              <tr className="border-b text-left text-slate-600">
                <th className="py-3">Customer</th>
                <th className="py-3">Email</th>
                <th className="py-3">Phone</th>
                <th className="py-3">Guests</th>
                <th className="py-3">Date</th>
                <th className="py-3">Time</th>
                <th className="py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((reservation) => (
                <tr
                  key={reservation._id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="py-4 font-medium">
                    {reservation.name}
                  </td>

                  <td>{reservation.email}</td>

                  <td>{reservation.phone}</td>

                  <td>{reservation.guests}</td>

                  <td>{reservation.date}</td>

                  <td>{reservation.time}</td>

                  <td className="text-center">
                    <button
                      onClick={() =>
                        deleteReservation(reservation._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}