// src/routes/chat.js
import { Router } from "express"
import { openai } from "../lib/openai.js"

const router = Router()

/**
 * Body:
 * {
 *   "message": "Hello",
 *   "history": [{ "role": "system"|"user"|"assistant", "content": "..." }]
 * }
 */
router.post("/chat", async (req, res) => {
  const { message, history = [] } = req.body || {}

  if (!message || typeof message !== "string") {
    return res
      .status(400)
      .json({ error: "Missing or invalid 'message' (string)" })
  }
  if (!Array.isArray(history)) {
    return res.status(400).json({ error: "'history' must be an array" })
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // keep your current model; swap if you like
      messages: [...history, { role: "user", content: message }],
    })

    const reply = response.choices?.[0]?.message?.content ?? "No response"
    return res.json({ reply })
  } catch (err) {
    // Common OpenAI error shapes
    const status = err.status ?? err.response?.status ?? 500
    const data = err.response?.data ?? { error: err.message || "OpenAI error" }

    console.error("OpenAI Error:", status, data)
    return res.status(500).json({ error: "Something went wrong with OpenAI" })
  }
})

export default router
