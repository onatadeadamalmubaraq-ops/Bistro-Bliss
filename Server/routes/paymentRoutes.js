import express from "express";
import {
  verifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get(
  "/verify/:transactionId",
  verifyPayment
);

export default router;