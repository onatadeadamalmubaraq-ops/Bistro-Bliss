import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    address: String,
  },

  items: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
],

  total: Number,

  paymentStatus: {
    type: String,
    default: "Paid",
  },

  orderStatus: {
  type: String,
  enum: [
    "Received",
    "Preparing",
    "Ready",
    "Picked Up",
    "In Transit",
    "Delivered"
  ],
  default: "Received",
},
branchId: String,
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);