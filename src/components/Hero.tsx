import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProjectStartModal from "./ProjectStartModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent via-accent to-primary/20 pt-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transforming Ideas into{" "}
            <span className="text-secondary">Digital Reality</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Accelerate your business with cutting-edge AI solutions, robust
            database architecture, and intelligent workflow automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="group"
              onClick={() => setIsModalOpen(true)}
            >
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById("services")?.scrollIntoView()}
            >
              Explore Services
            </Button>
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