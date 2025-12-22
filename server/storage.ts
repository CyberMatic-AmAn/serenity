import { db } from "./db";
import {
  messages,
  type InsertMessage,
  type Message
} from "@shared/schema";
import { eq, and, asc } from "drizzle-orm";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(userId: string, agentId: string): Promise<Message[]>;
}

export class DatabaseStorage implements IStorage {
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async getMessages(userId: string, agentId: string): Promise<Message[]> {
    return await db.select()
      .from(messages)
      .where(and(
        eq(messages.userId, userId),
        eq(messages.agentId, agentId)
      ))
      .orderBy(asc(messages.createdAt));
  }
}

export const storage = new DatabaseStorage();
