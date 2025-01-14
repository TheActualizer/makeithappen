import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Brain, Building2, Scale, Calculator, Truck, Factory, Search, Database, Shield, Code, Network, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  benefits: string[];
  metrics: string;
  caseStudy: {
    title: string;
    description: string;
    results: string;
  };
}

const services: Service[] = [
  {
    id: 1,
    title: "Finance & Markets Automation",
    description: "Revolutionary AI systems for financial markets and accounting",
    icon: Calculator,
    benefits: [
      "Real-time market analysis",
      "Automated accounting workflows",
      "Risk assessment automation",
      "Regulatory compliance"
    ],
    metrics: "85% reduction in processing time",
    caseStudy: {
      title: "Financial Markets Transformation",
      description: "Implemented agentic trading system with real-time analysis",
      results: "300% increase in trading efficiency"
    }
  },
  {
    id: 2,
    title: "Legal Department Automation",
    description: "HIPAA & GDPR compliant legal automation systems",
    icon: Scale,
    benefits: [
      "Automated contract review",
      "Compliance monitoring",
      "Case management",
      "Legal research automation"
    ],
    metrics: "75% faster document processing",
    caseStudy: {
      title: "Legal Tech Revolution",
      description: "Deployed AI-powered legal operations system",
      results: "90% reduction in review time"
    }
  },
  {
    id: 3,
    title: "Logistics & Manufacturing",
    description: "End-to-end supply chain and manufacturing optimization",
    icon: Truck,
    benefits: [
      "Supply chain optimization",
      "Predictive maintenance",
      "Inventory management",
      "Quality control automation"
    ],
    metrics: "60% improvement in efficiency",
    caseStudy: {
      title: "Manufacturing Excellence",
      description: "Implemented smart factory automation",
      results: "45% cost reduction"
    }
  },
  {
    id: 4,
    title: "Research & Development",
    description: "Sakana AI methodologies for rapid prototyping",
    icon: Search,
    benefits: [
      "Lightspeed prototyping",
      "Research automation",
      "Data analysis",
      "Innovation acceleration"
    ],
    metrics: "10x faster research cycles",
    caseStudy: {
      title: "R&D Transformation",
      description: "Applied Sakana AI methodologies",
      results: "5x increase in innovation rate"
    }
  },
  {
    id: 5,
    title: "Data Architecture & Processing",
    description: "Advanced data systems with AWS & Bedrock integration",
    icon: Database,
    benefits: [
      "Data enrichment",
      "Vector processing",
      "AWS integration",
      "Real-time analytics"
    ],
    metrics: "99.9% data accuracy achieved",
    caseStudy: {
      title: "Data Infrastructure",
      description: "Built scalable vector database system",
      results: "1M+ operations per second"
    }
  },
  {
    id: 6,
    title: "Agentic Systems Development",
    description: "Custom agent frameworks and memory systems",
    icon: Brain,
    benefits: [
      "Agent orchestration",
      "Memory systems",
      "Decision frameworks",
      "Workflow automation"
    ],
    metrics: "95% autonomous operation rate",
    caseStudy: {
      title: "Agentic Framework",
      description: "Developed custom agent network",
      results: "24/7 autonomous operations"
    }
  }
];

const ServiceCard = ({ service }: { service: Service }) => {
  const Icon = service.icon;
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer border-accent/20 bg-gradient-to-br from-accent/40 via-accent/30 to-accent/20 backdrop-blur-sm group">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500 group-hover:duration-200" />
          
          <CardHeader className="relative">
            <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-accent/40 to-accent/20 group-hover:from-accent/50 group-hover:to-accent/30 transition-all duration-500 backdrop-blur-md">
              <Icon className="w-6 h-6 text-secondary animate-pulse" />
            </div>
            <CardTitle className="group-hover:text-secondary transition-colors duration-500 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
              {service.title}
            </CardTitle>
            <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500">
              {service.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-sm font-medium text-secondary/80 group-hover:text-secondary transition-colors duration-500">
              {service.metrics}
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-gradient-to-br from-accent/95 to-accent/90 backdrop-blur-md border-accent/20 animate-in zoom-in-95 duration-200">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-secondary">Key Benefits:</h4>
          <ul className="text-sm list-disc pl-4 space-y-1 text-gray-300">
            {service.benefits.map((benefit, index) => (
              <li key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export const ServicesShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 md:px-6 lg:px-8 bg-background relative overflow-hidden" id="services">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-pulse" />
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/20 mb-6 animate-fade-in">
            <span className="text-sm text-secondary">Enterprise Solutions</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400 mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Advanced Automation Solutions
          </h2>
          
          <p className="text-gray-400 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '400ms' }}>
            Leverage cutting-edge AI and automation across your entire organization,
            from financial operations to research and development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '1000ms' }}>
          <Button 
            variant="default" 
            size="lg"
            onClick={() => navigate("/start-project")}
            className="group relative overflow-hidden bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-500"
          >
            <span className="relative z-10">Start Your Digital Transformation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          </Button>
          <p className="mt-4 text-sm text-gray-400">
            Ready to revolutionize your business operations? Let's discuss your project.
          </p>
        </div>
      </div>
    </section>
  );
};