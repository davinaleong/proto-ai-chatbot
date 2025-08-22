import { httpError } from "../utils/errors.js";
import { buildMessages, pickReply } from "../utils/normalize.js";

export async function chatOpenAI({ query, history = [], options = {} }) {
  const messages = buildMessages(history, query);

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${options.apiKey || (typeof process !== "undefined" ? process.env?.OPENAI_API_KEY : "")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: options.model || "gpt-4o-mini",
      messages,
      max_tokens: options.max_tokens ?? 512,
      temperature: options.temperature ?? 0.2,
      stream: false
    })
  });

  if (!res.ok) throw await httpError(res);
  const data = await res.json();

  return {
    reply: pickReply(data),
    provider: "openai",
    raw: data,
    usage: data?.usage ?? null
  };
}
