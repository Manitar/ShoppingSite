import { getProduct, getProductList, addProduct } from "../controllers/products.js"
import express from 'express'

const router = express.Router()

/* GET */
router.get("/getProduct/:productId", getProduct)
router.get("/getProductList", getProductList)

/* POST */
router.post("/addProduct", addProduct) // For testing or admin can add

export default router;