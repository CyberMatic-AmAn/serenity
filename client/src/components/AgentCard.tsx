import { motion } from "framer-motion";
import { MessageSquare, Phone, Video } from "lucide-react";
import { Link } from "wouter";

interface AgentProps {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  color: string;
}

export function AgentCard({ agent }: { agent: AgentProps }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-border/50 overflow-hidden relative group"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${agent.color}-100 rounded-bl-full -mr-8 -mt-8 opacity-50 group-hover:scale-125 transition-transform duration-500 ease-out`} />
      
      <div className="relative z-10">
        <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 shadow-md">
          {/* Using Unsplash with descriptive comment */}
          {/* Agent avatar portrait professional */}
          <img src={agent.imageUrl} alt={agent.name} className="w-full h-full object-cover" />
        </div>

        <h3 className="text-xl font-display font-bold text-foreground mb-1">{agent.name}</h3>
        <p className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-3">{agent.role}</p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
          {agent.description}
        </p>

        <div className="grid grid-cols-3 gap-3">
          <Link href={`/chat/${agent.id}`} className="col-span-1">
            <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground flex flex-col items-center justify-center gap-1 hover:bg-primary/90 transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span className="text-[10px] font-medium">Chat</span>
            </button>
          </Link>
          
          <button 
            disabled 
            className="col-span-1 py-3 rounded-xl bg-secondary text-secondary-foreground flex flex-col items-center justify-center gap-1 opacity-50 cursor-not-allowed hover:bg-secondary/80 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[10px] font-medium">Voice</span>
          </button>
          
          <button 
            disabled 
            className="col-span-1 py-3 rounded-xl bg-secondary text-secondary-foreground flex flex-col items-center justify-center gap-1 opacity-50 cursor-not-allowed hover:bg-secondary/80 transition-colors"
          >
            <Video className="w-5 h-5" />
            <span className="text-[10px] font-medium">Video</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
