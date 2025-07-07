import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface ChatRequestBody {
  message: string
  history?: OpenAI.Chat.ChatCompletionMessageParam[]
}

app.post(
  "/chat",
  async (req: Request<{}, {}, ChatRequestBody>, res: Response) => {
    const { message, history = [] } = req.body

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [...history, { role: "user", content: message }],
      })

      const reply = response.choices[0]?.message?.content || "No response"
      res.json({ reply })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Something went wrong" })
    }
  }
)

const PORT = Number(process.env.PORT) || 3001
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
)
