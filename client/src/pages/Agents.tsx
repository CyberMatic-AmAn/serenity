import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AgentCard } from "@/components/AgentCard";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/firebase";

const agents = [
  {
    id: "health-expert",
    name: "Dr. Atlas",
    role: "Health & Wellness",
    description: "Holistic health advice focusing on physical wellness, nutrition, and stress management techniques.",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=500&fit=crop",
    color: "green"
  },
  {
    id: "career-coach",
    name: "Sarah Miller",
    role: "Career Development",
    description: "Expert guidance on career transitions, resume building, and professional growth strategies.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop",
    color: "blue"
  },
  {
    id: "academic-mentor",
    name: "Prof. Chen",
    role: "Academic Supporter",
    description: "Study strategies, research assistance, and academic planning for students of all levels.",
    imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&h=500&fit=crop",
    color: "yellow"
  },
  {
    id: "finance-advisor",
    name: "James Sterling",
    role: "Financial Planning",
    description: "Smart money management, budgeting advice, and investment basics to secure your future.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop",
    color: "emerald"
  },
  {
    id: "relationship-guide",
    name: "Maya Angel",
    role: "Social Relationships",
    description: "Navigating complex social dynamics, building stronger bonds, and resolving conflicts.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop",
    color: "rose"
  },
  {
    id: "personal-coach",
    name: "Alex Rivera",
    role: "Personal Growth",
    description: "Self-discovery, habit formation, and personal accountability partner for your goals.",
    imageUrl: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=500&h=500&fit=crop",
    color: "purple"
  }
];

export default function Agents() {
  const { user, login } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Choose Your Guide</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a specialized AI agent to begin your journey. Each counselor is trained in specific areas to provide the most relevant support.
          </p>
        </div>

        {!user ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl text-center border border-border">
            <h3 className="text-xl font-bold mb-2">Sign in to Connect</h3>
            <p className="text-muted-foreground mb-6">Create an account to chat with our specialized agents.</p>
            <button 
              onClick={() => login()}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Sign In with Google
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AgentCard agent={agent} />
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
