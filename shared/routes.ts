import { z } from 'zod';
import { messages } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  chat: {
    send: {
      method: 'POST' as const,
      path: '/api/chat',
      input: z.object({
        message: z.string(),
        agentId: z.string(),
        userId: z.string(),
      }),
      responses: {
        200: z.object({ response: z.string() }),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
    history: {
      method: 'GET' as const,
      path: '/api/chat/:userId/:agentId',
      responses: {
        200: z.array(z.custom<typeof messages.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
