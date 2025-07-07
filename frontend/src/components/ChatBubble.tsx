import React from "react"
import type { ChatMessage } from "../lib/chatApi"

interface ChatBubbleProps {
  message: ChatMessage
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === "user"
  const isSystem = message.role === "system"

  const baseBubble = "relative rounded-lg px-4 py-2 max-w-[75%]"

  const bubbleStyles = isSystem
    ? "bg-yellow-100 text-sm text-gray-700 font-mono text-center mx-auto"
    : isUser
    ? "bg-black text-white ml-auto"
    : "bg-gray-200 text-black mr-auto"

  const bubbleAlignment = isSystem
    ? "justify-center"
    : isUser
    ? "justify-end"
    : "justify-start"

  const tailStyle = isSystem
    ? ""
    : isUser
    ? "after:content-[''] after:absolute after:right-0 after:top-2 after:border-t-8 after:border-t-transparent after:border-l-8 after:border-l-blue-500 after:border-b-8 after:border-b-transparent after:ml-2"
    : "after:content-[''] after:absolute after:left-0 after:top-2 after:border-t-8 after:border-t-transparent after:border-r-8 after:border-r-gray-200 after:border-b-8 after:border-b-transparent after:-ml-2"

  return (
    <div className={`flex ${bubbleAlignment} mb-2`}>
      <div className={`${baseBubble} ${bubbleStyles} ${tailStyle}`}>
        {message.content}
      </div>
    </div>
  )
}
