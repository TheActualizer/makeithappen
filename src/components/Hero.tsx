import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-8 overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent to-secondary/20" />
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-[20%] blur-3xl animate-pulse transform rotate-45" />
        <div className="absolute -bottom-32 -left-40 w-[600px] h-[600px] bg-secondary/20 rounded-[30%] blur-3xl animate-pulse delay-700 transform -rotate-12" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-[25%] blur-3xl animate-pulse delay-1000 transform rotate-90" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px] bg-opacity-20 transform rotate-45" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
              <span className="text-sm text-gray-300">From Simple Websites to Enterprise SaaS Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Building{" "}
              <span className="relative">
                <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-secondary via-primary to-secondary opacity-30"></span>
                <span className="relative bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
                  Next-Generation
                </span>
              </span>{" "}
              Digital Solutions
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto backdrop-blur-sm">
              Accelerate your vision with AI-powered development. We build 20x faster 
              than traditional methods, turning ideas into production-ready solutions at lightspeed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                onClick={() => navigate('/start-project')}
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

            <div className="mt-16 max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-accent/10 backdrop-blur-sm border border-accent/20 hover:bg-accent/20 transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-2">Advanced AI</h3>
                  <p className="text-sm text-gray-300">Custom agent networks & LLM orchestration</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 backdrop-blur-sm border border-accent/20 hover:bg-accent/20 transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-2">SaaS Platforms</h3>
                  <p className="text-sm text-gray-300">Scalable cloud-native solutions</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 backdrop-blur-sm border border-accent/20 hover:bg-accent/20 transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-2">Enterprise Apps</h3>
                  <p className="text-sm text-gray-300">Custom business automation</p>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full backdrop-blur-sm">
                <AccordionItem value="capabilities" className="border-accent/20">
                  <AccordionTrigger className="text-gray-300 hover:text-white">
                    <span className="flex items-center gap-2">
                      <ChevronDown className="h-4 w-4" />
                      View All Capabilities
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-400">
                      <div className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                        • Process Automation
                      </div>
                      <div className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                        • Digital Workforce
                      </div>
                      <div className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                        • Data Analytics
                      </div>
                      <div className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                        • Cloud Integration
                      </div>
                      <div className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                        • API Development
                      </div>
                      <div className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                        • Machine Learning
                      </div>
                      <div className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                        • DevOps & CI/CD
                      </div>
                      <div className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                        • Security & Compliance
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;