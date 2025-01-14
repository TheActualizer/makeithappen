import { ServicesShowcase } from "@/components/ServicesShowcase";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20">
      <Navbar />
      <main className="relative">
        <section className="pt-32 pb-16 px-4 relative">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90 mb-6">
                Complete Business Automation
              </h1>
              <p className="text-lg text-gray-300/90 max-w-2xl mx-auto mb-8">
                End-to-end solutions powered by AI
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Button
                variant="default"
                size="lg"
                onClick={() => navigate("/start-project")}
                className="group bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/contact")}
                className="border-gray-300 text-white hover:bg-white/10"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                See Demo
              </Button>
            </motion.div>
          </div>
        </section>

        <ServicesShowcase />
      </main>
    </div>
  );
};

export default Services;