import express from "express";
import multer from "multer";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

/* MULTER CONFIG */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({
  storage,
});

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