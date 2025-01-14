import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  metrics: string;
  tags: string[];
}

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const Icon = service.icon;
  
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg border-accent/20 bg-gradient-to-br from-accent/40 to-background backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-accent/30 p-3 group-hover:bg-accent/40 transition-colors">
            <Icon className="w-6 h-6 text-secondary" />
          </div>
          
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-secondary transition-colors">
              {service.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1">
          {service.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="bg-accent/30 hover:bg-accent/40"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2">
          {service.features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <div className="w-1 h-1 rounded-full bg-secondary" />
              {feature}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-accent/20">
          <p className="text-sm font-medium text-secondary">
            {service.metrics}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};