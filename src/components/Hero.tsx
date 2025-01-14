import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import ProjectStartModal from "./ProjectStartModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative flex flex-col justify-center min-h-[70vh] lg:min-h-[85vh] lg:sticky lg:top-24">
      <div className="space-y-6 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 animate-fade-in">
          <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
          <span className="text-sm text-gray-300">From Simple Websites to Enterprise SaaS Solutions</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Building{" "}
          <span className="relative">
            <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-secondary via-primary to-secondary opacity-30"></span>
            <span className="relative bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
              Next-Generation
            </span>
          </span>{" "}
          Digital Solutions
        </h1>
        
        <p className="text-lg text-gray-300 leading-relaxed max-w-xl backdrop-blur-sm">
          Transform your vision into reality with our comprehensive development solutions. 
          From responsive websites to sophisticated enterprise SaaS platforms powered by AI.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsModalOpen(true)}
          >
            Start Your Project
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: 'smooth' })}
            className="border-gray-500 hover:border-white transition-colors backdrop-blur-sm"
          >
            Explore Solutions
          </Button>
        </div>
      </div>

      <ProjectStartModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Hero;