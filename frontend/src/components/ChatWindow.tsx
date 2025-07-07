import React from "react"
import { useChat } from "../hooks/useChat"
import { ChatBubble } from "./ChatBubble"

export const ChatWindow: React.FC = () => {
  const { messages, input, setInput, loading, error, handleSend } = useChat()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleSend()
    }
  }

  return (
    <div className="flex flex-col max-w-2xl w-full h-full mx-auto bg-white border border-gray-200 rounded shadow">
      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        {loading && (
          <div className="text-gray-500 italic text-sm text-left animate-pulse">
            Assistant is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white flex gap-2">
        <input
          className="flex-1 bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleSend}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-500 text-sm px-4 pb-2 bg-white border-t">
          {error}
        </div>
      )}
    </div>
  )
}
