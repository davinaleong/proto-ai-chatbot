// src/routes/health.js
import { Router } from "express"
const router = Router()

router.get("/health", (_req, res) => res.status(200).json({ ok: true }))
router.head("/health", (_req, res) => res.sendStatus(200)) // optional

export default router
