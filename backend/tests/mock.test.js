import request from "supertest"
import express from "express"
import dotenv from "dotenv"
import mockApp from "../src/mock.js" // You’ll need to export `app` from mock.js

dotenv.config()

describe("Mock Chat API", () => {
  it("returns a fake GPT reply", async () => {
    const response = await request(mockApp)
      .post("/chat")
      .send({ message: "Hello world", history: [] })

    expect(response.status).toBe(200)
    expect(response.body.reply).toContain("FakeGPT")
  })

  it("returns 400 if message is missing", async () => {
    const response = await request(mockApp).post("/chat").send({})
    expect(response.status).toBe(400)
    expect(response.body.error).toMatch(/invalid message/i)
  })
})
