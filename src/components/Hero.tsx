import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Sparkles,
  Database,
  Bot,
  Calendar,
  Mail,
  FileText,
  BarChart,
  Lock,
  Users
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
      icon: Database,
      description: "Enterprise-grade data integration and synchronization capabilities"
    },
    {
      category: "AI & Automation",
      features: [
        "Multi-Agent Orchestration",
        "Natural Language Processing",
        "Predictive Analytics",
        "Automated Decision Making"
      ],
      icon: Bot,
      description: "Advanced AI-powered automation and analytics solutions"
    },
    {
      category: "Project Management",
      features: [
        "Client Onboarding",
        "Resource Planning",
        "Progress Tracking",
        "Team Collaboration"
      ],
      icon: Users,
      description: "Comprehensive project and resource management tools"
    },
    {
      category: "Meeting Management",
      features: [
        "AI Meeting Scheduling",
        "Automated Note Taking",
        "Action Item Tracking",
        "Follow-up Automation"
      ],
      icon: Calendar,
      description: "Intelligent meeting coordination and documentation"
    },
    {
      category: "Communication",
      features: [
        "Email Automation",
        "Client Portal",
        "Document Sharing",
        "Secure Messaging"
      ],
      icon: Mail,
      description: "Secure and automated communication channels"
    },
    {
      category: "Documentation",
      features: [
        "Auto-Generated Reports",
        "Knowledge Base",
        "Version Control",
        "Compliance Tracking"
      ],
      icon: FileText,
      description: "Comprehensive documentation and compliance management"
    },
    {
      category: "Analytics",
      features: [
        "Performance Metrics",
        "Custom Dashboards",
        "ROI Tracking",
        "Trend Analysis"
      ],
      icon: BarChart,
      description: "Advanced analytics and reporting capabilities"
    },
    {
      category: "Security",
      features: [
        "Role-Based Access",
        "Data Encryption",
        "Audit Logging",
        "Compliance Controls"
      ],
      icon: Lock,
      description: "Enterprise-grade security and compliance features"
    }
  ];

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-8 overflow-hidden bg-[#F6F6F7]">
      <div className="absolute inset-0 bg-grid-white opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#232F3E]/5 border border-[#232F3E]/10">
              <Sparkles className="w-3.5 h-3.5 text-[#232F3E]" />
              <span className="text-xs font-medium text-[#232F3E]">Enterprise-Grade Solutions</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-[#232F3E] mb-4">
              Transform Your Vision Into
              <span className="relative mx-2">
                <span className="absolute -inset-1 blur-sm bg-gradient-to-r from-[#232F3E]/20 to-[#FF9900]/20"></span>
                <span className="relative text-[#232F3E]">Digital Reality</span>
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-[#545B64] max-w-2xl mx-auto leading-relaxed">
              From simple websites to advanced AI-powered enterprise solutions. Experience 20x faster development with our comprehensive digital transformation platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
              <Button
                size="lg"
                className="bg-[#FF9900] hover:bg-[#EC7211] text-white min-w-[160px] shadow-sm"
                onClick={() => navigate('/start-project')}
              >
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: 'smooth' })}
                className="border-[#232F3E] text-[#232F3E] hover:bg-[#232F3E]/5 min-w-[160px]"
              >
                Explore Solutions
              </Button>
            </div>

            <div id="capabilities" className="mt-16 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {platformFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg border border-[#E9EBED] hover:border-[#FF9900] transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-[#F1F3F3] group-hover:bg-[#FFF7E5] transition-colors">
                          <Icon className="w-6 h-6 text-[#232F3E] group-hover:text-[#FF9900]" />
                        </div>
                        <div>
                          <h3 className="text-[#232F3E] font-semibold mb-2">{feature.category}</h3>
                          <p className="text-sm text-[#545B64] mb-4">{feature.description}</p>
                          <ul className="space-y-2">
                            {feature.features.map((item, i) => (
                              <li key={i} className="flex items-center text-sm text-[#545B64]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900] mr-2" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;