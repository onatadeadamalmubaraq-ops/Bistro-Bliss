import express from "express";
import {
  createReservation,
  getReservations,
  updateReservation,
} from "../controllers/reservationController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createReservation); // public
router.get("/", protect, getReservations); // admin
router.put("/:id", protect, updateReservation); // admin

export default router;