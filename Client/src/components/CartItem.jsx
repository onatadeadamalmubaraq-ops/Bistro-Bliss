import React from "react";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../redux/cartSlice";

import { useDispatch } from "react-redux";

export default function CartItem({
  item,
}) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-xl p-5 shadow">

      <div className="flex justify-between">

        <div>
          <h3 className="font-bold text-xl">
            {item.name}
          </h3>

          <p className="text-gray-500">
            ₦{item.price.toLocaleString()}
          </p>
        </div>

        <button
          onClick={() =>
            dispatch(
              removeFromCart(item._id)
            )
          }
          className="text-red-600"
        >
          Remove
        </button>
      </div>

      <div className="flex items-center gap-4 mt-5">

        <button
          onClick={() =>
            dispatch(
              decreaseQty(item._id)
            )
          }
          className="w-10 h-10 bg-gray-200 rounded"
        >
          -
        </button>

        <span className="font-bold">
          {item.qty}
        </span>

        <button
          onClick={() =>
            dispatch(
              increaseQty(item._id)
            )
          }
          className="w-10 h-10 bg-[#D4AF37]"
        >
          +
        </button>

      </div>
    </div>
  );
}