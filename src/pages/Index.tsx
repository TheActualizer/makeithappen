import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesShowcase from "@/components/ServicesShowcase";
import DifyChat from "@/components/chat/DifyChat";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20">
      <Navbar />
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="space-y-24 pb-24">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="pt-20 lg:pt-24"
          >
            <Hero />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-7xl"
          >
            <ServicesShowcase />
          </motion.div>
        </div>
      </motion.main>

      <DifyChat />
    </div>
  );
};

export default Index;