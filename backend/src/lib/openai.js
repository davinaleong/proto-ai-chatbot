// src/lib/openai.js
import OpenAI from "openai"

const { OPENAI_API_KEY } = process.env
if (!OPENAI_API_KEY) {
  // Throw at boot so deploys fail fast if the secret isn't set.
  throw new Error("OPENAI_API_KEY is not set")
}

export const openai = new OpenAI({ apiKey: OPENAI_API_KEY })
