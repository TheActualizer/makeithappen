import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import ProjectStartModal from "./ProjectStartModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-8 overflow-hidden">
      {/* Enhanced animated background with isometric elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent to-secondary/10" />
        
        {/* Isometric grid pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(68,71,77,0.1)_40%,rgba(68,71,77,0.1)_60%,transparent_60%)] bg-[size:4rem_4rem]" />
          <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_40%,rgba(68,71,77,0.1)_40%,rgba(68,71,77,0.1)_60%,transparent_60%)] bg-[size:4rem_4rem]" />
        </div>
        
        {/* Floating isometric shapes */}
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/10 transform rotate-45 skew-y-12 animate-float" />
        <div className="absolute -bottom-32 -left-40 w-[600px] h-[600px] bg-secondary/10 transform -rotate-12 skew-x-12 animate-float delay-700" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/5 transform rotate-30 skew-y-12 animate-float delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
              <span className="text-sm text-gray-300">Architecting Digital Excellence</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Forge{" "}
              <span className="relative">
                <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-secondary via-primary to-secondary opacity-30"></span>
                <span className="relative bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
                  Tomorrow's
                </span>
              </span>{" "}
              Digital Landscape
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto backdrop-blur-sm">
              Transform concepts into reality through precision-engineered solutions. 
              From intuitive interfaces to enterprise-grade systems, we architect 
              scalable digital experiences powered by next-generation AI technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                onClick={() => setIsModalOpen(true)}
              >
                Initiate Project
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: 'smooth' })}
                className="border-gray-500 hover:border-white transition-colors min-w-[200px] backdrop-blur-sm"
              >
                Discover Capabilities
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