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
    <div className="min-h-screen bg-[#1A1F2C] bg-gradient-to-br from-gray-900 via-[#1A1F2C] to-primary/20">
      {/* Twitter-style grid background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTkuNSA2MEgwVjBoNjB2NjBoLS41ek0xIDFoNTh2NThIMVYxeiIgZmlsbD0iIzFEQTFGMiIgZmlsbC1vcGFjaXR5PSIuMDMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      
      {/* Floating elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float delay-1000" />
      </div>
      
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