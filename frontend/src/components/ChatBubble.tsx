import React from "react"
import type { ChatMessage } from "../lib/chatApi"

interface ChatBubbleProps {
  message: ChatMessage
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === "user"
  const isSystem = message.role === "system"

  const bubbleStyles = isSystem
    ? "bg-yellow-100 text-sm text-gray-700 font-mono text-center mx-auto"
    : isUser
    ? "bg-blue-500 text-white ml-auto"
    : "bg-gray-200 text-black mr-auto"

  const bubbleAlignment = isSystem
    ? "justify-center"
    : isUser
    ? "justify-end"
    : "justify-start"

  return (
    <div className={`flex ${bubbleAlignment} mb-2`}>
      <div className={`rounded-lg px-4 py-2 max-w-[75%] ${bubbleStyles}`}>
        {message.content}
      </div>
    </div>
  )
}
