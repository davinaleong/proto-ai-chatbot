import { chatAIMLAPI } from "./providers/aimlapi.js";
import { chatOpenAI } from "./providers/openai.js"; // optional

export const Providers = {
  OPENAI: "openai",
  AIMLAPI: "aimlapi"
};

/**
 * Unified chat entry
 * @param {Object} args
 * @param {"openai"|"aimlapi"} args.provider
 * @param {string} args.query
 * @param {Array}  args.history
 * @param {Object} args.options
 */
export async function chat({ provider, query, history = [], options = {} }) {
  switch (provider) {
    case Providers.AIMLAPI:
      return chatAIMLAPI({ query, history, options });
    case Providers.OPENAI:
      return chatOpenAI({ query, history, options }); // optional
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
