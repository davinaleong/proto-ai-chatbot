import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.MOCK_PORT || 3001

app.use(cors())
app.use(express.json())

function fakeGptReply(message, history = []) {
  const last = history[history.length - 1]?.content || ""
  return `🧪 FakeGPT: You said "${message}". Last message was "${last}".`
}

app.post("/chat", (req, res) => {
  const { message, history = [] } = req.body

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Missing or invalid message" })
  }

  const reply = fakeGptReply(message, history)
  res.json({ reply })
})

// ONLY listen if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🧪 Simulated chat server running at http://localhost:${PORT}`)
  })
}

// ✅ export app for Supertest
export default app
