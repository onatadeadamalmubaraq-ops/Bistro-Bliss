import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  guests: Number,
  date: String,
  time: String,
  message: String,
  status: {
    type: String,
    default: "Pending",
  },
}, { timestamps: true });

export default mongoose.model("Reservation", reservationSchema);