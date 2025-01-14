import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import ChatInterface from "@/components/chat/ChatInterface";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";

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
            <Card className="my-20 bg-accent/40 backdrop-blur-sm border-accent/20 hover:bg-accent/50 transition-all duration-300">
              <CardContent className="p-12">
                <div className="text-center space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/10 mb-6">
                    <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
                    <span className="text-sm text-gray-300">Transform Your Business Today</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="relative">
                      <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-secondary via-primary to-secondary opacity-30"></span>
                      <span className="relative bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                        Ready to Transform Your Business?
                      </span>
                    </span>
                  </h2>
                  
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto backdrop-blur-sm">
                    Start your journey towards digital transformation today. Let's discuss how we can help bring your vision to life with our cutting-edge solutions and expertise.
                  </p>
                  
                  <div className="pt-8">
                    <Button 
                      size="lg"
                      className="group relative overflow-hidden bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg"
                      onClick={() => navigate("/start-project")}
                    >
                      Start Your Project Now
                      <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <ChatInterface />
    </div>
  );
};

export default Index;