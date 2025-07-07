import { useState } from "react"
import { sendMessage } from "./../lib/chatApi"
import type { ChatMessage } from "./../lib/chatApi"

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = { role: "user", content: input.trim() }
    const updatedHistory = [...messages, userMessage]

    setMessages(updatedHistory)
    setInput("")
    setLoading(true)
    setError(null)

    try {
      const { reply } = await sendMessage(userMessage.content, updatedHistory)
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: reply,
      }
      setMessages([...updatedHistory, assistantMessage])
    } catch (err: any) {
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return {
    messages,
    input,
    setInput,
    loading,
    error,
    handleSend,
  }
}
