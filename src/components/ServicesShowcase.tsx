import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Brain, Building2, Stethoscope, Landmark, ArrowRight, Sparkles } from "lucide-react";
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
    title: "Healthcare Automation",
    description: "Streamline medical workflows and enhance patient care with AI-powered automation",
    icon: Stethoscope,
    benefits: [
      "Reduce administrative overhead",
      "Improve patient data accuracy",
      "Enhance billing efficiency"
    ],
    metrics: "Reduce manual processing time by 40%",
    caseStudy: {
      title: "Major Hospital Group Implementation",
      description: "Implemented automated patient scheduling and billing system",
      results: "Saved 200+ hours monthly in administrative tasks"
    }
  },
  {
    id: 2,
    title: "Financial Process Optimization",
    description: "Automate complex financial workflows and improve accuracy",
    icon: Landmark,
    benefits: [
      "Automated reconciliation",
      "Real-time reporting",
      "Compliance automation"
    ],
    metrics: "Improve accuracy by 30%",
    caseStudy: {
      title: "Investment Firm Transformation",
      description: "Automated trading reconciliation and reporting",
      results: "Reduced processing time by 65%"
    }
  },
  {
    id: 3,
    title: "Real Estate Underwriting",
    description: "Accelerate property assessment and risk analysis with AI",
    icon: Building2,
    benefits: [
      "Faster property evaluation",
      "Risk assessment automation",
      "Market analysis integration"
    ],
    metrics: "Speed up underwriting by 50%",
    caseStudy: {
      title: "Property Management Revolution",
      description: "Implemented AI-driven property assessment",
      results: "Increased portfolio evaluation speed by 3x"
    }
  },
  {
    id: 4,
    title: "Custom AI Solutions",
    description: "Tailored artificial intelligence solutions for your unique challenges",
    icon: Brain,
    benefits: [
      "Custom ML models",
      "Natural language processing",
      "Predictive analytics"
    ],
    metrics: "Achieve 90% automation in targeted processes",
    caseStudy: {
      title: "AI-Powered Customer Service",
      description: "Built custom NLP model for customer support",
      results: "Handled 70% of queries automatically"
    }
  }
];

const ServiceCard = ({ service }: { service: Service }) => {
  const Icon = service.icon;
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer border-accent/20 bg-accent/40 backdrop-blur-sm group">
          <CardHeader>
            <div className="mb-4 inline-flex p-3 rounded-lg bg-accent/30 group-hover:bg-accent/40 transition-colors">
              <Icon className="w-6 h-6 text-secondary" />
            </div>
            <CardTitle className="group-hover:text-secondary transition-colors">{service.title}</CardTitle>
            <CardDescription className="text-gray-400">{service.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-secondary/80">{service.metrics}</p>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-accent/95 backdrop-blur-sm border-accent/20">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-secondary">Key Benefits:</h4>
          <ul className="text-sm list-disc pl-4 space-y-1 text-gray-300">
            {service.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const CaseStudyDialog = ({ service }: { service: Service }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center text-sm text-secondary hover:text-secondary/80 transition-colors">
          View Case Study <ArrowRight className="ml-1 w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-accent/95 backdrop-blur-sm border-accent/20">
        <DialogHeader>
          <DialogTitle className="text-secondary flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {service.caseStudy.title}
          </DialogTitle>
          <DialogDescription>
            {service.caseStudy.description}
            <div className="mt-4 p-4 bg-accent/40 rounded-lg border border-accent/20">
              <p className="font-semibold text-secondary">Results:</p>
              <p className="mt-2 text-gray-300">{service.caseStudy.results}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export const ServicesShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredServices = selectedCategory 
    ? services.filter(service => service.title === selectedCategory)
    : services;

  return (
    <section className="py-24 px-4 md:px-6 lg:px-8 bg-background relative" id="services">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-6">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm text-gray-300">Our Services</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
            Comprehensive AI Solutions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our range of AI-powered solutions designed to transform your business operations
            and drive sustainable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="space-y-4">
              <ServiceCard service={service} />
              <div className="text-center">
                <CaseStudyDialog service={service} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button 
            variant="default" 
            size="lg"
            onClick={() => navigate("/start-project")}
            className="group bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300"
          >
            Start Your Project
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-4 text-sm text-gray-400">
            Ready to transform your business? Let's discuss your project in detail.
          </p>
        </div>
      </div>
    </section>
  );
};