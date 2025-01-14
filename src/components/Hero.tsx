import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import ProjectStartModal from "./ProjectStartModal";

const Hero = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-8 overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent to-secondary/20" />
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-[20%] blur-3xl animate-pulse transform rotate-45" />
        <div className="absolute -bottom-32 -left-40 w-[600px] h-[600px] bg-secondary/20 rounded-[30%] blur-3xl animate-pulse delay-700 transform -rotate-12" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px] bg-opacity-20 transform rotate-45" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-4">
              <Sparkles className="w-4 h-4 text-[#F97316] animate-pulse" />
              <span className="text-sm font-light tracking-wider text-[#D946EF] animate-pulse">SuperNova Level Disruption</span>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight">
                <span className="block text-white/80 text-2xl md:text-3xl mb-2 animate-fade-in">From</span>
                <span className="relative inline-block animate-float">
                  <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] opacity-30"></span>
                  <span className="relative bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent">
                    Websites
                  </span>
                </span>
                <span className="text-white/80 mx-2 text-2xl md:text-3xl">to</span>
                <span className="block mt-1 text-[#0EA5E9] animate-bounce">
                  Autonomous Enterprise Systems
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-[#9b87f5] font-light mt-4 tracking-wide animate-fade-in">
                AI Agent Swarms Building at
                <span className="text-[#D946EF] font-bold mx-2 animate-pulse">20x Speed</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="p-6 rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/10 hover:border-accent/30 transition-all">
                <h3 className="text-lg font-semibold text-[#F97316] mb-2">Website & Business Operations</h3>
                <p className="text-sm text-gray-300">AI-powered client management with CRM integration, meeting summaries, and automated follow-ups</p>
              </div>
              
              <div className="p-6 rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/10 hover:border-accent/30 transition-all">
                <h3 className="text-lg font-semibold text-[#0EA5E9] mb-2">Extensive AI Agent Operations</h3>
                <p className="text-sm text-gray-300">Multi-agent swarms automating policies, procedures, and complex business workflows</p>
              </div>

              <div className="p-6 rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/10 hover:border-accent/30 transition-all">
                <h3 className="text-lg font-semibold text-[#22C55E] mb-2">Advanced Industry Calculations</h3>
                <p className="text-sm text-gray-300">Specialized computation engines for accounting, legal analysis, and engineering simulations</p>
              </div>

              <div className="p-6 rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/10 hover:border-accent/30 transition-all">
                <h3 className="text-lg font-semibold text-[#EC4899] mb-2">Healthcare Automation</h3>
                <p className="text-sm text-gray-300">HIPAA-compliant, FHIR-integrated autonomous systems for healthcare operations</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:from-[#8B5CF6]/90 hover:to-[#D946EF]/90 transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                onClick={() => setIsModalOpen(true)}
              >
                Start Building
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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