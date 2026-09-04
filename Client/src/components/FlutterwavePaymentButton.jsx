import React from "react";
import {
  useFlutterwave,
  closePaymentModal,
} from "flutterwave-react-v3";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { createOrder } from "../services/payment";
import { clearCart } from "../redux/cartSlice";

export default function FlutterwavePaymentButton({
  customer,
  deliveryFee = 0,
  branch,
  region,
  area,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      Number(item.price || 0) *
        Number(item.qty || 0),
    0
  );

  const total = subtotal + Number(deliveryFee || 0);

  const config = {
    public_key:
      import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,

    tx_ref: `BB-${Date.now()}`,

    amount: total,

    currency: "NGN",

    payment_options:
      "card,banktransfer,ussd",

    customer: {
      email:
        customer?.email ||
        "guest@bistrobliss.com",

      phone_number:
        customer?.phone || "",

      name:
        customer?.name || "Guest Customer",
    },

    customizations: {
      title: "Bistro Bliss",
      description:
        "Premium Food Order Payment",
    },
  };

  const handleFlutterPayment =
    useFlutterwave(config);

  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (
      !customer?.name ||
      !customer?.phone ||
      !customer?.email ||
      !customer?.address
    ) {
      alert(
        "Please complete delivery information."
      );
      return;
    }

    handleFlutterPayment({
      callback: async (response) => {
        closePaymentModal();

        try {
          const orderPayload = {
            customer,

            items: cartItems.map(
              (item) => ({
                product: item._id,
                name: item.name,
                price: item.price,
                quantity: item.qty,
              })
            ),

            subtotal,
            deliveryFee,
            total,

            zone: {
              branch,
              region,
              area,
            },

            paymentStatus: "Paid",

            tx_ref: response.tx_ref,

            transactionId:
              response.transaction_id,
          };

          const result =
            await createOrder(
              orderPayload
            );

          dispatch(clearCart());

          navigate("/success", {
            state: {
              order: result,
            },
          });
        } catch (error) {
          console.error(error);

          navigate("/failed");
        }
      },

      onClose: () => {
        console.log(
          "Payment modal closed"
        );
      },
    });
  };

  return (
    <button
      onClick={handlePayment}
      disabled={
        cartItems.length === 0
      }
      className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold text-lg transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Pay ₦{total.toLocaleString()}
    </button>
  );
}