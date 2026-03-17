import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  productById,
  productList
} from "../controllers/productController.js";

const productRouter = express.Router();

// ==============================
// ADD PRODUCT (Seller Protected)
// ==============================

productRouter.post(
  "/add",
  authSeller,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
  ]),
  addProduct
);

// ==============================
// GET ALL PRODUCTS
// ==============================

productRouter.get("/list", productList);

// ==============================
// GET PRODUCT BY ID
// ==============================

productRouter.get("/id/:id", productById);

// ==============================
// CHANGE PRODUCT STOCK
// ==============================

productRouter.post("/stock", authSeller, changeStock);

export default productRouter;