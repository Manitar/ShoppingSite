import express from "express";
import { getUserList, addProductToCart, updateQuantity, purchaseItems, removeProductFromCart, getProductInCart } from "../controllers/users.js"
const router = express.Router();

/* GET */
router.get("/getUserList", getUserList)
router.get("/:userId/cart/:productId", getProductInCart)


/* POST */
router.post("/:userId/cart/:productId", addProductToCart)
router.post("/:userId/purchase", purchaseItems)

/* PATCH */
router.patch("/:userId/cart/:update/:productId", updateQuantity) // :Update = 1 is increase, update = -1 is decrease

/* DELETE */
router.delete("/:userId/cart/:productId", removeProductFromCart)

export default router;