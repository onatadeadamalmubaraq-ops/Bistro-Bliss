import React, { useEffect, useState } from "react";
import api from "../../services/axios";
import { socket } from "../../services/socket";

export default function RiderDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();

    socket.emit("joinRider");

    const handleUpdate = (order) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === order._id ? order : o))
      );
    };

    socket.on("orderUpdated", handleUpdate);

    return () => {
      socket.off("orderUpdated", handleUpdate);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");

      // ✅ FILTER ONLY RIDER-RELEVANT ORDERS
      const filtered = res.data.filter((order) =>
        ["Ready", "Picked Up", "In Transit"].includes(
          order.orderStatus
        )
      );

      setOrders(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Rider Panel
      </h1>

      <div className="space-y-4">

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded shadow"
          >
            <p className="font-bold">
              {order.customer?.name}
            </p>

            <p>Address: {order.customer?.address}</p>

            <p>Status: {order.orderStatus}</p>

            <div className="flex gap-2 mt-3">

              <button
                onClick={() =>
                  updateStatus(order._id, "Picked Up")
                }
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Picked Up
              </button>

              <button
                onClick={() =>
                  updateStatus(order._id, "In Transit")
                }
                className="px-3 py-1 bg-purple-600 text-white rounded"
              >
                In Transit
              </button>

              <button
                onClick={() =>
                  updateStatus(order._id, "Delivered")
                }
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Delivered
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}