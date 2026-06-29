import React, { useEffect, useState } from "react";
import api from "../../services/axios";
import { socket } from "../../services/socket";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log("Orders fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    /* LIVE SOCKET UPDATES */
    socket.on("newOrder", (data) => {
      setOrders((prev) => [data, ...prev]);
    });

    socket.on("orderUpdated", (updated) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === updated._id ? updated : o))
      );
    });

    return () => {
      socket.off("newOrder");
      socket.off("orderUpdated");
    };
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, orderStatus: status } : o
        )
      );
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  /* ================= STATUS COLORS ================= */
  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Preparing":
        return "bg-blue-100 text-blue-700";
      case "Ready":
        return "bg-green-100 text-green-700";
      case "Delivered":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  /* ================= UI ================= */
  return (
    <div className="p-4 md:p-6 lg:p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">
          Orders Management
        </h1>

        <button
          onClick={fetchOrders}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm"
        >
          Refresh
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-500 py-10">
          Loading orders...
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && orders.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No orders found
        </div>
      )}

      {/* ORDERS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow p-4 md:p-5 space-y-3"
          >

            {/* TOP ROW */}
            <div className="flex justify-between items-start gap-3">
              <div>
                <p className="font-bold text-sm md:text-base">
                  {order.customer?.name || "Guest"}
                </p>
                <p className="text-xs text-gray-500">
                  {order.customer?.email}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full ${statusColor(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* ORDER INFO */}
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                Total:{" "}
                <span className="font-bold">
                  ₦{Number(order.total || 0).toLocaleString()}
                </span>
              </p>

              <p>
                Items:{" "}
                <span className="text-gray-600">
                  {order.items?.length || 0}
                </span>
              </p>

              <p className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            {/* ITEMS PREVIEW */}
            <div className="text-xs text-gray-600 border-t pt-2">
              {order.items?.slice(0, 3).map((item, i) => (
                <p key={i}>
                  • {item.name} x{item.quantity}
                </p>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-2 pt-2">

              <button
                onClick={() =>
                  updateStatus(order._id, "Preparing")
                }
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded"
              >
                Preparing
              </button>

              <button
                onClick={() =>
                  updateStatus(order._id, "Ready")
                }
                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded"
              >
                Ready
              </button>

              <button
                onClick={() =>
                  updateStatus(order._id, "Delivered")
                }
                className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded"
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