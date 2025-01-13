import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import ProjectStartModal from "./ProjectStartModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-16 px-4 overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent to-secondary/20" />
        
        {/* Animated orbs - adjusted for mobile */}
        <div className="absolute top-1/4 -right-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-40 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Decorative elements - adjusted for mobile */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px)] bg-[size:20px] md:bg-[size:40px] bg-opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:20px] md:bg-[size:40px] bg-opacity-20" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-4 md:mb-6 animate-fade-in">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-secondary animate-pulse" />
              <span className="text-xs md:text-sm text-gray-300">Transforming Ideas into Reality</span>
            </div>
            
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-4 md:px-0">
              Building the Future with{" "}
              <span className="relative">
                <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-secondary via-primary to-secondary opacity-30"></span>
                <span className="relative bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
                  AI-Powered Solutions
                </span>
              </span>
            </h1>
            
            <p className="text-base md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto backdrop-blur-sm px-4 md:px-0">
              Accelerate your business growth with cutting-edge AI solutions, robust
              database architecture, and intelligent workflow automation tailored to
              your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 md:mt-12 px-4 md:px-0">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto min-w-[200px]"
                onClick={() => setIsModalOpen(true)}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: 'smooth' })}
                className="border-gray-500 hover:border-white transition-colors w-full sm:w-auto min-w-[200px] backdrop-blur-sm"
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