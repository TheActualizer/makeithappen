import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";
import ProjectStartModal from "./ProjectStartModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Hero = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-8 overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Isometric grid background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent to-secondary/20" />
        
        {/* Animated geometric shapes */}
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-[20%] blur-3xl animate-pulse transform rotate-45" />
        <div className="absolute -bottom-32 -left-40 w-[600px] h-[600px] bg-secondary/20 rounded-[30%] blur-3xl animate-pulse delay-700 transform -rotate-12" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-[25%] blur-3xl animate-pulse delay-1000 transform rotate-90" />
        
        {/* Isometric grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px] bg-opacity-20 transform rotate-45" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
              <span className="text-sm font-light tracking-wider text-[#D946EF] animate-pulse">Transforming Ideas into Digital Reality at 20x Speed</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight animate-float">
              Unleashing{" "}
              <span className="relative">
                <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] opacity-30"></span>
                <span className="relative bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent animate-pulse">
                  Autonomous Agents
                </span>
              </span>{" "}
              <br />
              <span className="text-[#0EA5E9] animate-bounce inline-block">Building at Hyperspeed</span>
            </h1>
            
            <p className="text-base md:text-lg text-[#9b87f5] leading-relaxed max-w-2xl mx-auto backdrop-blur-sm animate-fade-in">
              From startup websites to enterprise-scale systems, our autonomous agent swarms 
              build, test, and deploy at 20x speed. Experience the future of disruptive development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                onClick={() => setIsModalOpen(true)}
              >
                Start Building
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

            <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto mt-12">
              <AccordionItem value="capabilities" className="border-accent/20">
                <AccordionTrigger className="text-gray-300 hover:text-white">
                  <span className="flex items-center gap-2">
                    <ChevronDown className="h-4 w-4" />
                    Our Capabilities
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-400">
                    <div className="p-3 rounded-lg bg-[#1A1F2C]/30 backdrop-blur-sm border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 transition-all">
                      • Multi-Agent Systems
                    </div>
                    <div className="p-3 rounded-lg bg-[#1A1F2C]/30 backdrop-blur-sm border border-[#D946EF]/20 hover:border-[#D946EF]/50 transition-all">
                      • Autonomous Development
                    </div>
                    <div className="p-3 rounded-lg bg-[#1A1F2C]/30 backdrop-blur-sm border border-[#F97316]/20 hover:border-[#F97316]/50 transition-all">
                      • Swarm Intelligence
                    </div>
                    <div className="p-3 rounded-lg bg-[#1A1F2C]/30 backdrop-blur-sm border border-[#0EA5E9]/20 hover:border-[#0EA5E9]/50 transition-all">
                      • Rapid Prototyping
                    </div>
                    <div className="p-3 rounded-lg bg-[#1A1F2C]/30 backdrop-blur-sm border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 transition-all">
                      • AI-Driven Architecture
                    </div>
                    <div className="p-3 rounded-lg bg-[#1A1F2C]/30 backdrop-blur-sm border border-[#D946EF]/20 hover:border-[#D946EF]/50 transition-all">
                      • Disruptive Innovation
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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