import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import FlutterwavePaymentButton from "../components/FlutterwavePaymentButton";

import { deliveryZones } from "../data/deliveryData";

export default function Checkout() {
  const { items: cartItems = [] } = useSelector(
    (state) => state.cart || {}
  );

  const [branch, setBranch] =
    useState("Maiduguri");

  const [region, setRegion] =
    useState(
      Object.keys(
        deliveryZones.Maiduguri
      )[0]
    );

  const [area, setArea] =
    useState(
      Object.keys(
        deliveryZones.Maiduguri[
          Object.keys(
            deliveryZones.Maiduguri
          )[0]
        ]
      )[0]
    );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) =>
        acc +
        Number(item.price || 0) *
          Number(item.qty || 0),
      0
    );
  }, [cartItems]);

  const regions = Object.keys(
    deliveryZones[branch]
  );

  const areas = Object.keys(
    deliveryZones[branch][region]
  );

  const deliveryFee =
    deliveryZones?.[branch]?.[
      region
    ]?.[area] || 0;

  const total =
    subtotal + deliveryFee;

  return (
    <div className="bg-[#FCFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <h1 className="text-5xl font-bold text-[#111111]">
          Checkout
        </h1>

        <p className="text-gray-500 mt-3">
          Complete your order details
        </p>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">

          {/* LEFT */}
          <div>

            <CheckoutForm
              form={form}
              setForm={setForm}
            />

            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

              <h2 className="text-2xl font-bold mb-6">
                Delivery Information
              </h2>

              {/* BRANCH */}
              <div className="mb-4">

                <label className="font-medium block mb-2">
                  Branch
                </label>

                <select
                  value={branch}
                  onChange={(e) => {
                    const selectedBranch =
                      e.target.value;

                    setBranch(
                      selectedBranch
                    );

                    const firstRegion =
                      Object.keys(
                        deliveryZones[
                          selectedBranch
                        ]
                      )[0];

                    setRegion(
                      firstRegion
                    );

                    const firstArea =
                      Object.keys(
                        deliveryZones[
                          selectedBranch
                        ][firstRegion]
                      )[0];

                    setArea(firstArea);
                  }}
                  className="w-full border border-gray-300 rounded-xl p-3"
                >
                  {Object.keys(
                    deliveryZones
                  ).map((branch) => (
                    <option
                      key={branch}
                      value={branch}
                    >
                      {branch}
                    </option>
                  ))}
                </select>

              </div>

              {/* REGION */}
              <div className="mb-4">

                <label className="font-medium block mb-2">
                  Region / LGA
                </label>

                <select
                  value={region}
                  onChange={(e) => {
                    const selectedRegion =
                      e.target.value;

                    setRegion(
                      selectedRegion
                    );

                    const firstArea =
                      Object.keys(
                        deliveryZones[
                          branch
                        ][selectedRegion]
                      )[0];

                    setArea(firstArea);
                  }}
                  className="w-full border border-gray-300 rounded-xl p-3"
                >
                  {regions.map(
                    (region) => (
                      <option
                        key={region}
                        value={region}
                      >
                        {region}
                      </option>
                    )
                  )}
                </select>

              </div>

              {/* AREA */}
              <div>

                <label className="font-medium block mb-2">
                  Delivery Area
                </label>

                <select
                  value={area}
                  onChange={(e) =>
                    setArea(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-xl p-3"
                >
                  {areas.map(
                    (area) => (
                      <option
                        key={area}
                        value={area}
                      >
                        {area}
                      </option>
                    )
                  )}
                </select>

              </div>

              <div className="mt-6 bg-[#FCFBF7] p-4 rounded-xl">

                <p className="text-gray-500">
                  Delivery Fee
                </p>

                <h3 className="text-2xl font-bold text-[#8B0000]">
                  ₦
                  {deliveryFee.toLocaleString()}
                </h3>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div>

            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
            />

            <div className="mt-6">

              <FlutterwavePaymentButton
                customer={form}
                deliveryFee={deliveryFee}
                total={total}
                cartItems={cartItems}
                branch={branch}
                region={region}
                area={area}
              />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}