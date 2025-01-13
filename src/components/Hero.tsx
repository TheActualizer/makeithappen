import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProjectStartModal from "./ProjectStartModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transforming Ideas into{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-secondary/80 to-primary/80 animate-pulse">
                Digital Reality
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Accelerate your business with cutting-edge AI solutions, robust
              database architecture, and intelligent workflow automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
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
                className="border-gray-500 hover:border-white transition-colors duration-300"
              >
                Explore Services
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