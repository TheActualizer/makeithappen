import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import DifyChat from "@/components/chat/DifyChat";
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
      
      <main className="relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-24 pb-24">
          <div className="pt-20 lg:pt-24">
            <Hero />
          </div>

          <div className="mx-auto max-w-7xl">
            <ServicesShowcase />
          </div>
        </div>
      </main>

      <DifyChat />
    </div>
  );
};

export default Index;