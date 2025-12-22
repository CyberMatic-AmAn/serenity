import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

export function useChatHistory(userId: string | undefined, agentId: string) {
  return useQuery({
    queryKey: [api.chat.history.path, userId, agentId],
    queryFn: async () => {
      if (!userId) return [];
      const url = buildUrl(api.chat.history.path, { userId, agentId });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch history");
      return api.chat.history.responses[200].parse(await res.json());
    },
    enabled: !!userId,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { message: string; agentId: string; userId: string }) => {
      const validated = api.chat.send.input.parse(data);
      const res = await fetch(api.chat.send.path, {
        method: api.chat.send.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        throw new Error("Failed to send message");
      }
      return api.chat.send.responses[200].parse(await res.json());
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [api.chat.history.path, variables.userId, variables.agentId],
      });
    },
  });
}
