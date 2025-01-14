import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, Calculator, Scale, Truck, Search, Database } from "lucide-react";
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
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = service.icon;
  
  return (
    <motion.div
      className="relative w-full h-[400px] cursor-pointer preserve-3d"
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Front of card */}
      <Card className="absolute w-full h-full backface-hidden border-accent/20 bg-accent/40 backdrop-blur-sm">
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

      {/* Back of card */}
      <Card 
        className="absolute w-full h-full backface-hidden border-accent/20 bg-accent/40 backdrop-blur-sm rotate-y-180"
      >
        <CardHeader>
          <CardTitle className="text-xl text-secondary">{service.caseStudy.title}</CardTitle>
          <CardDescription className="text-gray-400">{service.caseStudy.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-secondary">Key Benefits:</h4>
            <ul className="text-sm list-disc pl-4 space-y-1 text-gray-300">
              {service.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          <p className="text-sm font-medium text-primary mt-4">
            Results: {service.caseStudy.results}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ServicesShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 md:px-6 lg:px-8 bg-background relative" id="services">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
            Enterprise-Grade Automation Solutions
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Leverage cutting-edge AI and automation across your entire organization,
            from financial operations to research and development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Button 
            variant="default" 
            size="lg"
            onClick={() => navigate("/start-project")}
            className="group bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300"
          >
            Start Your Digital Transformation
          </Button>
          <p className="mt-4 text-sm text-gray-400">
            Ready to revolutionize your business operations? Let's discuss your project.
          </p>
        </motion.div>
      </div>
    </section>
  );
};