import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-display font-bold mb-8 text-center">Our Mission</h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-center mb-16">
              We believe that mental wellness and life guidance should be accessible to everyone, everywhere. 
              Serenity combines advanced AI technology with human-centric design to create a safe space for growth.
            </p>
            
            <div className="relative rounded-3xl overflow-hidden mb-16 shadow-2xl">
               {/* Team working together in modern office */}
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop" 
                alt="Our Team" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white font-medium text-lg">Building the future of digital counseling</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold font-display mb-4">The Technology</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Powered by Google's Gemini AI models, our agents are fine-tuned to provide empathetic, 
                  context-aware responses. They don't just answer questions; they help you explore solutions.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display mb-4">The Philosophy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Technology should serve humanity, not replace it. Our tools are designed to augment 
                  your personal journey, providing clarity and support when you need it most.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
