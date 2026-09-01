import express from "express";

import upload from "../middleware/multer.js"; // 👈 Import your Cloudinary multer

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

/* ROUTES */

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post(
  "/",
  upload.single("image"),
  createProduct
);

router.put(
  "/:id",
  upload.single("image"),
  updateProduct
);

router.delete("/:id", deleteProduct);

export default router;