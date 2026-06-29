import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";

import { Server } from "socket.io";

/* ROUTES */
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";

const app = express();
const server = http.createServer(app);

/* SOCKET */
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
app.set("io", io);
/* GLOBAL MIDDLEWARE */
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/products", productRoutes);

/* 🔥 ATTACH SOCKET TO REQUEST */
app.use((req, res, next) => {
  req.io = io;
  next();
});

/* ROUTES */
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reservations", reservationRoutes);

/* SOCKET EVENTS */
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("joinKitchen", () => {
    socket.join("kitchen");
  });

  socket.on("joinRider", () => {
    socket.join("rider");
  });

  socket.on("riderLocation", (data) => {
    socket.broadcast.emit("riderMoved", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

/* MONGODB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* START SERVER */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});