import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Configuration, OpenAIApi } from "openai"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

app.post("/chat", async (req, res) => {
  const { message, history = [] } = req.body

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [...history, { role: "user", content: message }],
    })

    const reply = response.data.choices[0].message.content
    res.json({ reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Something went wrong" })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
