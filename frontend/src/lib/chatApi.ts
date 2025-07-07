const API_BASE = import.meta.env.VITE_API_BASE_URL as string

export interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

export interface ChatRequestBody {
  message: string
  history?: ChatMessage[]
}

export interface ChatResponseBody {
  reply: string
}

/**
 * Sends a message to the backend chat API.
 * @param message The message from the user.
 * @param history Optional history of the conversation.
 * @returns The assistant's reply.
 */
export async function sendMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<ChatResponseBody> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history } as ChatRequestBody),
  })

  if (!res.ok) {
    const errorBody = await res.json()
    throw new Error(errorBody?.error || "API request failed")
  }

  const data = (await res.json()) as ChatResponseBody
  return data
}
