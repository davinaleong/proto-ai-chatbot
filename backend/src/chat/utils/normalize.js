// Ensure our UI can keep using OpenAI-style messages/history

// Accepts UI history like [{role, content}] and the new query -> returns messages ready for provider
export function buildMessages(history = [], query) {
  return [...history, { role: "user", content: String(query) }];
}

// Extract a reply string from a provider response safely
export function pickReply(data) {
  // Prefer OpenAI-like shape
  if (data?.choices?.[0]?.message?.content) return data.choices[0].message.content;
  if (data?.message?.content) return data.message.content;
  if (data?.content) return data.content;
  // Fallback
  return "";
}
