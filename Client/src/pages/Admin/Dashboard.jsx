import React, { useEffect, useState } from "react";
import api from "../../services/axios";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [o, p, r, s] = await Promise.all([
        api.get("/orders"),
        api.get("/products"),
        api.get("/reservations"),
        api.get("/admin/analytics"),
      ]);

      setOrders(o.data || []);
      setProducts(p.data || []);
      setReservations(r.data || []);
      setStats(s.data || {});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6">

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          Revenue <br />
          <b>₦{stats.totalRevenue || 0}</b>
        </div>

        <div className="bg-white p-4 rounded shadow">
          Orders <br />
          <b>{orders.length}</b>
        </div>

        <div className="bg-white p-4 rounded shadow">
          Products <br />
          <b>{products.length}</b>
        </div>

        <div className="bg-white p-4 rounded shadow">
          Reservations <br />
          <b>{reservations.length}</b>
        </div>
      </div>

      {/* ORDERS + RESERVATIONS */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-3">Recent Orders</h2>

          {orders.slice(0, 5).map((o) => (
            <div key={o._id} className="border-b py-2">
              Order #{o._id.slice(-5)} — {o.status}
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-3">Reservations</h2>

          {reservations.slice(0, 5).map((r) => (
            <div key={r._id} className="border-b py-2">
              {r.name} — {r.date}
            </div>
          ))}
        </div>

      </div>

      {/* PRODUCTS PREVIEW */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-3">Products</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.slice(0, 6).map((p) => (
            <div key={p._id} className="border p-3 rounded">
              <p className="font-bold">{p.name}</p>
              <p>₦{p.price}</p>
              <p className="text-sm text-gray-500">
                {p.category} / {p.subCategory}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}