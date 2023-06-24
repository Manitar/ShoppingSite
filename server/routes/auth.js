import { login, register, validateToken } from "../controllers/auth.js"
import express from 'express'

const router = express.Router()

/* GET */
router.get("/validate", validateToken)

/* POST */
router.post("/login", login)
router.post("/register", register)

export default router;