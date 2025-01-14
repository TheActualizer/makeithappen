import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 cursor-pointer border-accent/10 bg-accent/30 backdrop-blur-md group animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader>
            <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-500 animate-float">
              <Icon className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-500" />
            </div>
            <CardTitle className="group-hover:text-secondary transition-colors duration-300 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:from-secondary group-hover:to-primary">
              {service.title}
            </CardTitle>
            <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              {service.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-secondary/80 group-hover:text-secondary transition-colors duration-300">
              {service.metrics}
            </p>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-gradient-to-br from-accent/95 to-accent/90 backdrop-blur-xl border-accent/20 animate-fade-in">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
            Key Benefits:
          </h4>
          <ul className="text-sm list-disc pl-4 space-y-1 text-gray-300">
            {service.benefits.map((benefit, index) => (
              <li key={index} className="opacity-0 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
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
    <section className="py-24 px-4 md:px-6 lg:px-8 relative overflow-hidden" id="services">
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent/95 to-primary/20" />
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:30px_30px]" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-6">
            Enterprise-Grade Automation Solutions
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Leverage cutting-edge AI and automation across your entire organization,
            from financial operations to research and development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="opacity-0 animate-fade-in" style={{ animationDelay: `${service.id * 100}ms` }}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in">
          <Button 
            variant="default" 
            size="lg"
            onClick={() => navigate("/start-project")}
            className="group relative overflow-hidden bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-500"
          >
            <span className="relative z-10">Start Your Digital Transformation</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Button>
          <p className="mt-4 text-sm text-gray-400">
            Ready to revolutionize your business operations? Let's discuss your project.
          </p>
        </div>
      </div>
    </section>
  );
};