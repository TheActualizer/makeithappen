import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import ChatInterface from "@/components/chat/ChatInterface";
import { useEffect, useState } from "react";

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
      
      <main className="relative space-y-12 md:space-y-20">
        <div className="pt-16 lg:pt-20">
          <Hero />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
          <ServicesShowcase />
        </div>
      </main>

      <ChatInterface />
    </div>
  );
};

export default Index;