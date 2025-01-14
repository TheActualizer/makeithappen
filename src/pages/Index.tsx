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
      
      <main className="relative mx-auto">
        {/* Compact layout with side-by-side sections on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-20 px-4 lg:px-8 max-w-[2000px] mx-auto">
          {/* Left column */}
          <div className="space-y-8">
            <Hero />
          </div>
          
          {/* Right column */}
          <div className="space-y-8">
            <ServicesShowcase />
          </div>
        </div>
      </main>

      <ChatInterface />
    </div>
  );
};

export default Index;