import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error("Missing OPENAI_API_KEY in environment variables.")
}

const configuration = new Configuration({
  apiKey,
})

const openai = new OpenAIApi(configuration)

interface ChatRequestBody {
  message: string
  history?: ChatCompletionRequestMessage[]
}

app.post(
  "/chat",
  async (req: Request<{}, {}, ChatRequestBody>, res: Response) => {
    const { message, history = [] } = req.body

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [...history, { role: "user", content: message }],
      })

      const reply = response.data.choices[0]?.message?.content || "No response"
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
