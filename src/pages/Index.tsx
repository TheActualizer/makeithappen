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
      
      <main className="container">
        {/* Two-column layout on larger screens */}
        <div className="grid lg:grid-cols-2 gap-8 pt-20">
          {/* Left column - Hero section stays visible */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]">
            <Hero />
          </div>
          
          {/* Right column - Scrollable content */}
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