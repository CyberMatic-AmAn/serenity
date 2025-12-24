import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini using Replit AI Integration
const genAI = new GoogleGenAI({
  apiKey:
    process.env.AI_INTEGRATIONS_GEMINI_API_KEY ||
    "AIzaSyDa6AWT3jksC-C-xBlf6vA2oDJ0RvQ8N3A",
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

const agentsContexts: Record<string, string> = {
  health:
    "You are a health counselor. Provide advice on physical and mental well-being.",
  carrier:
    "You are a career counselor. Help with career guidance, resume tips, and job search strategies.",
  academic:
    "You are an academic supporter. Help with study tips, subject explanations, and educational planning.",
  finance: "You are a finance counselor. specific topic: finance.",
  social:
    "You are a social relationship counselor. Advice on friends, family, and social dynamics.",
  personal:
    "You are a personal counselor. General life advice and personal development.",
};

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.post(api.chat.send.path, async (req, res) => {
    try {
      const input = api.chat.send.input.parse(req.body);
      const { message, agentId, userId } = input;

      // 1. Save user message
      await storage.createMessage({
        userId,
        agentId,
        role: "user",
        content: message,
      });

      // 2. Generate AI response
      const systemInstruction =
        agentsContexts[agentId] || "You are a helpful counselor.";

      let aiResponseText =
        "I'm sorry, I cannot process your request at the moment.";

      try {
        const model = genAI.models.generateContent({
          model: "gemini-2.5-flash",
        }); // Use a standard model name supported by the integration
        const prompt = `${systemInstruction}\n\nUser: ${message}`;
        const result = await model.generateContent(prompt);
        aiResponseText = result.response.text();
      } catch (error) {
        console.error("Gemini API Error:", error);
        aiResponseText =
          "Sorry, I'm having trouble connecting to my brain right now.";
      }

      // 3. Save AI message
      await storage.createMessage({
        userId,
        agentId,
        role: "model",
        content: aiResponseText,
      });

      res.json({ response: aiResponseText });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      } else {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });

  app.get(api.chat.history.path, async (req, res) => {
    const { userId, agentId } = req.params;
    const history = await storage.getMessages(userId, agentId);
    res.json(history);
  });

  return httpServer;
}
