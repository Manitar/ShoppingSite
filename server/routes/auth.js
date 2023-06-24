import { login, register, validateToken } from "../controllers/auth.js"
import express from 'express'

const router = express.Router()



/* POST */
router.post("/validate", validateToken)
router.post("/login", login)
router.post("/register", register)

export default router;