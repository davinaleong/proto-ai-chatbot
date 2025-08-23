// src/index.js
import app from "./app.js"

// Render injects PORT. Keep a fallback for local dev.
const PORT = process.env.PORT || process.env.CHAT_PORT || 3000

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
