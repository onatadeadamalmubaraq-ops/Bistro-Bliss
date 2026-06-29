import React from "react";
export default function Receipt({ order }) {
  return (
    <div className="p-6 bg-white">

      <h1 className="text-2xl font-bold">
        Bistro Bliss Receipt
      </h1>

      <p>Order ID: {order._id}</p>

      <p>Name: {order.customer.name}</p>

      <p>Total: ₦{order.total}</p>

      <hr className="my-4" />

      {order.items.map((item) => (
        <div key={item._id}>
          {item.name} x {item.quantity}
        </div>
      ))}

      <button
        onClick={() => window.print()}
        className="mt-4 bg-black text-white px-4 py-2"
      >
        Print
      </button>

    </div>
  );
}