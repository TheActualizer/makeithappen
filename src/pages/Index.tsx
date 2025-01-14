import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import ChatInterface from "@/components/chat/ChatInterface";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20 relative overflow-hidden">
      <Navbar />
      <main className="relative">
        {/* Parallax background elements */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            transition: 'transform 0.1s linear',
          }}
        >
          <div 
            className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
          <div 
            className="absolute top-1/2 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-500"
            style={{
              transform: `translateY(${scrollY * -0.2}px)`,
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
            }}
          />
        </div>
        
        {/* Main content with parallax effects */}
        <div className="relative">
          <div 
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
              transition: 'transform 0.1s linear',
            }}
          >
            <Hero />
          </div>
          
          <div 
            style={{
              transform: `translateY(${scrollY * -0.05}px)`,
              transition: 'transform 0.1s linear',
            }}
          >
            <ServicesShowcase />
          </div>

          <div 
            className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            style={{
              transform: `translateY(${scrollY * -0.02}px)`,
              transition: 'transform 0.1s linear',
            }}
          >
            <div className="my-20 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
                Start your journey towards digital transformation today. Let's discuss how we can help bring your vision to life.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/start-project")}
              >
                Start Your Project Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      <ChatInterface />
    </div>
  );
};

export default Index;