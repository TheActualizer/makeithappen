import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import ProjectStartModal from "./ProjectStartModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-8">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent to-secondary/20" />
        
        {/* Subtle animated orbs */}
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse opacity-50" />
        <div className="absolute -bottom-32 -left-40 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700 opacity-50" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="container relative z-10">
        <div className="content-wide mx-auto text-center">
          <div className="space-y-4">
            {/* Feature tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm text-gray-200">From Simple Websites to Enterprise SaaS Solutions</span>
            </div>
            
            {/* Main heading */}
            <h1 className="mx-auto">
              Building{" "}
              <span className="relative">
                <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-secondary via-primary to-secondary opacity-30"></span>
                <span className="relative bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
                  Next-Generation
                </span>
              </span>{" "}
              Digital Solutions
            </h1>
            
            {/* Description */}
            <p className="mx-auto text-gray-300">
              Transform your vision into reality with our comprehensive development solutions. 
              From responsive websites to sophisticated enterprise SaaS platforms powered by AI, 
              we deliver scalable solutions with advanced reporting, third-party integrations, 
              and complex computational capabilities.
            </p>
            
            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
              <Button
                size="lg"
                className="group relative overflow-hidden button-gradient min-w-[200px]"
                onClick={() => setIsModalOpen(true)}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: 'smooth' })}
                className="border-gray-500 hover:border-white transition-colors min-w-[200px] backdrop-blur-sm"
              >
                Explore Solutions
              </Button>
            </div>
          </div>
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