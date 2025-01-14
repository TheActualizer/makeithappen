import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Sparkles, 
  ChevronDown, 
  Zap, 
  Building2, 
  Brain,
  Database,
  Bot,
  Calendar,
  Mail,
  FileText,
  BarChart,
  Network,
  Users,
  Lock,
  Workflow
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Hero = () => {
  const navigate = useNavigate();

  const platformFeatures = [
    {
      category: "Data & Integration",
      features: [
        "Multi-Database Synchronization",
        "Real-time Data Pipelines",
        "Custom API Development",
        "ETL Automation"
      ],
      icon: Database
    },
    {
      category: "AI & Automation",
      features: [
        "Multi-Agent Orchestration",
        "Natural Language Processing",
        "Predictive Analytics",
        "Automated Decision Making"
      ],
      icon: Bot
    },
    {
      category: "Project Management",
      features: [
        "Client Onboarding",
        "Resource Planning",
        "Progress Tracking",
        "Team Collaboration"
      ],
      icon: Users
    },
    {
      category: "Meeting Management",
      features: [
        "AI Meeting Scheduling",
        "Automated Note Taking",
        "Action Item Tracking",
        "Follow-up Automation"
      ],
      icon: Calendar
    },
    {
      category: "Communication",
      features: [
        "Email Automation",
        "Client Portal",
        "Document Sharing",
        "Secure Messaging"
      ],
      icon: Mail
    },
    {
      category: "Documentation",
      features: [
        "Auto-Generated Reports",
        "Knowledge Base",
        "Version Control",
        "Compliance Tracking"
      ],
      icon: FileText
    },
    {
      category: "Analytics",
      features: [
        "Performance Metrics",
        "Custom Dashboards",
        "ROI Tracking",
        "Trend Analysis"
      ],
      icon: BarChart
    },
    {
      category: "Security",
      features: [
        "Role-Based Access",
        "Data Encryption",
        "Audit Logging",
        "Compliance Controls"
      ],
      icon: Lock
    }
  ];

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
                      <Workflow className="h-5 w-5 text-primary" />
                      <span className="text-lg font-semibold">Enterprise-Grade Platform Features</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {platformFeatures.map((category, index) => {
                        const Icon = category.icon;
                        return (
                          <div 
                            key={index}
                            className="space-y-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <h3 className="font-medium text-[#333]">{category.category}</h3>
                            </div>
                            <ul className="space-y-2">
                              {category.features.map((feature, featureIndex) => (
                                <li 
                                  key={featureIndex}
                                  className="flex items-center gap-2 text-sm text-gray-600"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
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
