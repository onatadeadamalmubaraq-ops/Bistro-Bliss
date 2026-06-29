import React from "react";

export default function Reservations() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Reservations
      </h1>

      <div className="bg-white rounded-2xl p-6 shadow overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-3">
                Customer
              </th>

              <th>Date</th>

              <th>Time</th>

              <th>Guests</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td className="py-4">
                John Doe
              </td>

              <td>
                10/06/2026
              </td>

              <td>
                7:00 PM
              </td>

              <td>
                4
              </td>

              <td>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Confirmed
                </span>
              </td>
            </tr>

          </tbody>

        </table>

      </div>
    </div>
  );
}