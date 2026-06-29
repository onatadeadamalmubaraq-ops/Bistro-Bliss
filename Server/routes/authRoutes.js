import express from "express";

import {
  registerUser,
  loginUser,
  getMe,
  changePassword,
  createStaffAccount,
  getSetupStatus,
} from "../controllers/authController.js";

import { protect } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.post("/register", registerUser);

router.post("/login", loginUser);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.get("/me", protect, getMe);

router.put(
  "/change-password",
  protect,
  changePassword
);

/*
|--------------------------------------------------------------------------
| Admin Only
|--------------------------------------------------------------------------
*/

router.post(
  "/staff",
  protect,
  authorizeRoles("Admin"),
  createStaffAccount
);
router.get(
  "/setup-status",
  getSetupStatus
);

export default router;