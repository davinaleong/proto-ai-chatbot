// src/app.js
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import chatRoutes from "./routes/chat.js"
import healthRoutes from "./routes/health.js"

// Load .env in non-production; Render provides env vars automatically.
if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}

const app = express()

// CORS: allow all by default; lock down with CORS_ORIGINS="https://a.com,https://b.com"
const origins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)

app.use(cors({ origin: origins.length ? origins : true }))
app.use(express.json())

// Health check for Render
app.use("/", healthRoutes) // GET /health, HEAD /health

// Mount your API
app.use("/", chatRoutes) // POST /chat
// or app.use("/api", chatRoutes);  // POST /api/chat

export default app
