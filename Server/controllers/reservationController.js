import Reservation from "../models/Reservation.js";
import nodemailer from "nodemailer";

export const createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);

    // 🔥 SOCKET REAL TIME UPDATE
    req.io.emit("newReservation", reservation);

    // 📧 EMAIL NOTIFICATION
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Table Reservation",
      html: `
        <h3>New Reservation</h3>
        <p><b>Name:</b> ${reservation.name}</p>
        <p><b>Phone:</b> ${reservation.phone}</p>
        <p><b>Date:</b> ${reservation.date} ${reservation.time}</p>
        <p><b>Guests:</b> ${reservation.guests}</p>
      `,
    });

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReservations = async (req, res) => {
  const data = await Reservation.find().sort({ createdAt: -1 });
  res.json(data);
};

export const updateReservation = async (req, res) => {
  const updated = await Reservation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  req.io.emit("reservationUpdated", updated);

  res.json(updated);
};