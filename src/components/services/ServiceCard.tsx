import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { LucideIcon } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
  metrics: string;
  caseStudy: {
    title: string;
    description: string;
    results: string;
  };
}

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const Icon = service.icon;
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer border-accent/20 bg-accent/40 backdrop-blur-sm group">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="inline-flex p-3 rounded-lg bg-accent/30 group-hover:bg-accent/40 transition-colors">
                <Icon className="w-6 h-6 text-secondary" />
              </div>
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