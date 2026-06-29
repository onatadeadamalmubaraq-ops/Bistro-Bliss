import express from "express";
import {
  getAnalytics
} from "../controllers/adminController.js";

import { protect } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";

const router = express.Router();

router.get(
  "/analytics",
  protect,
  authorizeRoles("Admin", "Sales Manager"),
  getAnalytics
);

export default router;