import React, { useEffect, useState } from "react";
import api from "../../services/axios";
import { socket } from "../../services/socket";

export default function KitchenDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();

    socket.emit("joinKitchen");

    socket.on("newOrder", (order) => {
      setOrders((prev) => [order, ...prev]);

      alert(
        `🍽️ New Order Received!\n\nCustomer: ${
          order.customer?.name || "Customer"
        }`
      );
    });

    socket.on("orderUpdated", (updated) => {
      setOrders((prev) =>
        prev.map((o) =>
          o._id === updated._id ? updated : o
        )
      );
    });

    socket.on("notification", (data) => {
      if (data.type === "new-order") {
        alert(`🍽️ ${data.message}`);
      }
    });

    return () => {
      socket.off("newOrder");
      socket.off("orderUpdated");
      socket.off("notification");
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, {
        status,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Kitchen Panel
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

            <p className="mt-2">
              {order.items?.map((i, idx) => (
                <span key={idx}>
                  {i.name} x{i.quantity} <br />
                </span>
              ))}
            </p>

            <p>
              Status: {order.orderStatus}
            </p>

            <div className="flex gap-2 mt-3">

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Preparing"
                  )
                }
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Start Cooking
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Ready"
                  )
                }
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Ready
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}