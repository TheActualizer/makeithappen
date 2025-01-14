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
    <div className="relative min-h-[90vh] flex items-center justify-center pt-8 overflow-hidden bg-[#f8f8f8]">
      <div className="absolute inset-0 bg-grid-white opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Enterprise-Grade Development</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-[#333] mb-4">
              Building
              <span className="relative mx-2">
                <span className="absolute -inset-1 blur-sm bg-gradient-to-r from-primary/30 to-secondary/30"></span>
                <span className="relative text-primary">Next-Generation</span>
              </span>
              Solutions
            </h1>
            
            <p className="text-base md:text-lg text-[#666] max-w-2xl mx-auto leading-relaxed">
              20x faster development with AI-powered solutions. From prototypes to enterprise platforms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
              <Button
                size="lg"
                className="bg-[#3665f3] hover:bg-[#2b4fb4] text-white min-w-[160px] shadow-sm"
                onClick={() => navigate('/start-project')}
              >
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: 'smooth' })}
                className="border-[#3665f3] text-[#3665f3] hover:bg-[#3665f3]/5 min-w-[160px]"
              >
                View Capabilities
              </Button>
            </div>

            <div id="capabilities" className="mt-16 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-[#333] mb-3">AI Integration</h3>
                  <p className="text-sm text-[#666] mb-4">Custom agent networks & LLM orchestration for intelligent automation</p>
                  <div className="text-xs text-[#3665f3]">Learn more →</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-[#333] mb-3">SaaS Development</h3>
                  <p className="text-sm text-[#666] mb-4">Scalable cloud-native solutions with modern architecture</p>
                  <div className="text-xs text-[#3665f3]">Learn more →</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-[#333] mb-3">Enterprise Apps</h3>
                  <p className="text-sm text-[#666] mb-4">Custom business process automation and workflows</p>
                  <div className="text-xs text-[#3665f3]">Learn more →</div>
                </div>
              </div>

              <Accordion type="single" collapsible className="bg-white rounded-lg border border-gray-200">
                <AccordionItem value="capabilities" className="border-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    <span className="flex items-center gap-2 text-[#333]">
                      <ChevronDown className="h-4 w-4 text-[#3665f3]" />
                      Additional Capabilities
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        "Process Automation",
                        "Digital Workforce",
                        "Data Analytics",
                        "Cloud Integration",
                        "API Development",
                        "Machine Learning",
                        "DevOps & CI/CD",
                        "Security & Compliance"
                      ].map((capability, index) => (
                        <div 
                          key={index}
                          className="p-3 text-sm text-[#666] bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                        >
                          • {capability}
                        </div>
                      ))}
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