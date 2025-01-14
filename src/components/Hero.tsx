import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ChevronDown, Zap, Building2, Brain } from "lucide-react";
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
              <span className="text-xs font-medium text-primary">From Simple to Enterprise-Grade</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-[#333] mb-4">
              Transform Your Vision Into
              <span className="relative mx-2">
                <span className="absolute -inset-1 blur-sm bg-gradient-to-r from-primary/30 to-secondary/30"></span>
                <span className="relative text-primary">Digital Reality</span>
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-[#666] max-w-2xl mx-auto leading-relaxed">
              From simple websites to advanced AI-powered enterprise solutions. Experience 20x faster development with our comprehensive digital transformation platform.
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
                Explore Solutions
              </Button>
            </div>

            <div id="capabilities" className="mt-16 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#333]">Quick Launch</h3>
                  </div>
                  <p className="text-sm text-[#666] mb-4">Simple websites & MVPs built in days, not months</p>
                  <ul className="space-y-2 text-sm text-[#666]">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400" />
                      Rapid prototyping
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400" />
                      Custom landing pages
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400" />
                      Basic e-commerce
                    </li>
                  </ul>
                </div>

                <div className="group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#333]">Business Suite</h3>
                  </div>
                  <p className="text-sm text-[#666] mb-4">Complete business process automation</p>
                  <ul className="space-y-2 text-sm text-[#666]">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-indigo-400" />
                      CRM integration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-indigo-400" />
                      Document automation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-indigo-400" />
                      Workflow optimization
                    </li>
                  </ul>
                </div>

                <div className="group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
                      <Brain className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#333]">Enterprise AI</h3>
                  </div>
                  <p className="text-sm text-[#666] mb-4">Advanced AI-powered solutions</p>
                  <ul className="space-y-2 text-sm text-[#666]">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-purple-400" />
                      Multi-agent systems
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-purple-400" />
                      Predictive analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-purple-400" />
                      Neural networks
                    </li>
                  </ul>
                </div>
              </div>

              <Accordion type="single" collapsible className="bg-white rounded-lg border border-gray-200">
                <AccordionItem value="features" className="border-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    <span className="flex items-center gap-2 text-[#333]">
                      <ChevronDown className="h-4 w-4 text-[#3665f3]" />
                      Platform Features
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        "Client Onboarding",
                        "Project Management",
                        "Meeting Scheduling",
                        "Document Sharing",
                        "AI Meeting Notes",
                        "Email Automation",
                        "Client Dashboard",
                        "Database Integration",
                        "Progress Tracking",
                        "Resource Planning",
                        "Team Collaboration",
                        "Analytics & Reports"
                      ].map((feature, index) => (
                        <div 
                          key={index}
                          className="p-3 text-sm text-[#666] bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                        >
                          • {feature}
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