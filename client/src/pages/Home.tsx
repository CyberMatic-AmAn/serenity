import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, UserCheck, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white z-10" />
          {/* Abstract calm nature background */}
          <img 
            src="https://pixabay.com/get/g2b88a58240c5d75d6801a7267f3b3b37e8af10b66bf1d51549a34e55b78ca33c408df1f35c9cf1b3fd121045bec369c15f4547299eaa3d4e487b7b84589aa2f6_1280.jpg" 
            alt="Serene landscape" 
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              AI-Powered Personal Growth
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-foreground tracking-tight">
              Find clarity in <br className="hidden md:block"/>
              <span className="text-primary italic">every conversation.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Connect with specialized AI counselors for health, career, and personal guidance. 
              Private, accessible, and always here for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/agents">
                <button className="px-8 py-4 bg-primary text-white rounded-full font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  Meet Your Counselors <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/about">
                <button className="px-8 py-4 bg-white text-foreground border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-all duration-300">
                  Learn How It Works
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Why choose Serenity?</h2>
            <p className="text-muted-foreground">Expert guidance powered by advanced AI.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-primary" />}
              title="Private & Secure"
              description="Your conversations are encrypted and private. Share your thoughts without fear of judgment."
              delay={0.1}
            />
            <FeatureCard 
              icon={<UserCheck className="w-8 h-8 text-primary" />}
              title="Specialized Agents"
              description="Don't just talk to a bot. Consult with experts trained in specific fields like health and finance."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Clock className="w-8 h-8 text-primary" />}
              title="24/7 Availability"
              description="Support whenever you need it. No appointments, no waiting rooms, just instant connection."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="p-8 rounded-3xl bg-secondary/30 border border-secondary hover:bg-secondary/50 transition-colors"
    >
      <div className="mb-6 bg-white p-4 rounded-2xl w-fit shadow-sm">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
