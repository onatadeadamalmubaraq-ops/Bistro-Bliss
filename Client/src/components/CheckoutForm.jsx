import React from 'react';
export default function CheckoutForm({
  form,
  setForm,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold">
        Customer Information
      </h2>

      <div className="space-y-4 mt-6">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded"
          value={form.name}
          onChange={e =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border p-3 rounded"
          value={form.phone}
          onChange={e =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Delivery Address"
          className="w-full border p-3 rounded"
          rows="4"
          value={form.address}
          onChange={e =>
            setForm({
              ...form,
              address: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}