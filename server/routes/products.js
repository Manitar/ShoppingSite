import { getProduct, getProductList, addProduct, searchProducts } from "../controllers/products.js"
import express from 'express'

const router = express.Router()

/* GET */
router.get("/getProduct/:productId", getProduct)
router.get("/getProductList", getProductList)
router.get("/search/:searchQuery", searchProducts)


/* POST */
router.post("/addProduct", addProduct) // For testing or admin can add


export default router;