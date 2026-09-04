import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { verifyPayment } from "../controllers/paymentController.js";
const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.put("/:id", updateOrderStatus);
router.post("/verify-payment", verifyPayment);

export default router;