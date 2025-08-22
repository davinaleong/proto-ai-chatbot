import { httpError } from "../utils/errors.js";
import { buildMessages, pickReply } from "../utils/normalize.js";

/**
 * AIMLAPI chat call
 * @param {Object} params
 * @param {string} params.query
 * @param {Array}  params.history
 * @param {Object} params.options - { apiKey, model, max_tokens, temperature, stream }
 */
export async function chatAIMLAPI({ query, history = [], options = {} }) {
  const messages = buildMessages(history, query);

  const payload = {
    model: options.model || "gpt-4o",
    messages,
    max_tokens: options.max_tokens ?? 512,
    temperature: options.temperature ?? 0.2,
    stream: !!options.stream // keep false unless you implement SSE
  };

  const res = await fetch("https://api.aimlapi.com/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${options.apiKey || (typeof process !== "undefined" ? process.env?.AIMLAPI_KEY : "")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw await httpError(res);
  const data = await res.json();

  return {
    reply: pickReply(data),
    provider: "aimlapi",
    raw: data,
    usage: data?.usage ?? null
  };
}
