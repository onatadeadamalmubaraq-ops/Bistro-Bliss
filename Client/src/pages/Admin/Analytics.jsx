import React, { useEffect, useState } from "react";
import api from "../../services/axios";

export default function Analytics() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/admin/analytics");
      setStats(res.data);
    } catch (err) {
      console.log("Analytics error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
           Analytics Dashboard
        </h1>
        <p className="text-gray-500">
          Overview of sales performance and order activity
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ₦{Number(stats.totalRevenue || 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {stats.totalOrders || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Average Order Value</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            ₦{Number(stats.avgOrderValue || 0).toLocaleString()}
          </p>
        </div>

      </div>

      {/* INSIGHT SECTION */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
           Performance Insight
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li>
            • Total sales generated across all completed orders.
          </li>
          <li>
            • Number of customer orders placed in the system.
          </li>
          <li>
            • Average value per order to measure customer spending.
          </li>
        </ul>
      </div>

    </div>
  );
}