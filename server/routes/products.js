import {
  getProduct,
  getProductList,
  addProduct,
  searchProducts,
  editPrice,
} from "../controllers/products.js";
import express from "express";

const router = express.Router();

/* GET */
router.get("/getProduct/:productId", getProduct);
router.get("/getProductList", getProductList);
router.get("/search/:searchQuery", searchProducts);

/* POST */
router.post("/addProduct", addProduct); // For testing or admin can add

/* PATCH */
router.patch("/editPrice/:productId", editPrice);

export default router;
