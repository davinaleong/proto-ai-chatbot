import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const app = express()
const PORT = process.env.CHAT_PORT || 3000

app.use(cors())
app.use(express.json())

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

app.post("/chat", async (req, res) => {
  const { message, history = [] } = req.body

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Missing or invalid message" })
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [...history, { role: "user", content: message }],
    })

    const reply = response.choices[0]?.message?.content || "No response"
    res.json({ reply })
  } catch (error) {
    console.error("OpenAI Error:", error.message)
    res.status(500).json({ error: "Something went wrong with OpenAI" })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
