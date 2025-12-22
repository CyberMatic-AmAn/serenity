import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "wouter";
import { useAuth } from "@/lib/firebase";
import { Navbar } from "@/components/Navbar";
import { useChatHistory, useSendMessage } from "@/hooks/use-chat";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

// Map IDs to Names for display (in a real app this would come from a DB or config)
const agentNames: Record<string, string> = {
  "health-expert": "Dr. Atlas",
  "career-coach": "Sarah Miller",
  "academic-mentor": "Prof. Chen",
  "finance-advisor": "James Sterling",
  "relationship-guide": "Maya Angel",
  "personal-coach": "Alex Rivera"
};

export default function Chat() {
  const { id: agentId } = useParams();
  const [location, setLocation] = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/agents");
    }
  }, [user, authLoading, setLocation]);

  const { data: history, isLoading: historyLoading } = useChatHistory(user?.uid, agentId || "");
  const sendMessage = useSendMessage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user || !agentId) return;

    const message = input;
    setInput(""); // Optimistic clear

    try {
      await sendMessage.mutateAsync({
        message,
        agentId,
        userId: user.uid
      });
    } catch (error) {
      console.error("Failed to send message", error);
      // Ideally restore input here or show toast
    }
  };

  if (authLoading || historyLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const agentName = agentId ? (agentNames[agentId] || "Counselor") : "Counselor";

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="pt-24 pb-4 px-6 border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto flex items-center gap-4">
          <Link href="/agents">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          </Link>
          <div>
            <h1 className="font-display font-bold text-lg">{agentName}</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-secondary/20">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="text-center text-xs text-muted-foreground my-4">
            Today
          </div>
          
          {history?.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                    : 'bg-white text-foreground border border-border rounded-tl-none'
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <span className={`text-[10px] block mt-2 ${msg.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {new Date(msg.createdAt!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
          
          {sendMessage.isPending && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-border">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-border p-4">
        <div className="container mx-auto max-w-3xl">
          <form onSubmit={handleSend} className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${agentName}...`}
              className="flex-1 py-4 px-6 bg-secondary/30 rounded-full border-transparent focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-white transition-all outline-none"
              disabled={sendMessage.isPending}
            />
            <button
              type="submit"
              disabled={!input.trim() || sendMessage.isPending}
              className="p-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
