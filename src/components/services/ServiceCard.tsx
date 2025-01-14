import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  metrics?: string;
  tags?: string[];
}

interface ServiceCardProps {
  service: Service;
  Icon: LucideIcon;
}

export const ServiceCard = ({ service, Icon }: ServiceCardProps) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-accent/20 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {service.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          </div>
        </div>

        {service.tags && service.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {service.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-primary/10 text-primary hover:bg-primary/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {service.features && service.features.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-2">
            {service.features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div className="w-1 h-1 rounded-full bg-primary/70" />
                {feature}
              </div>
            ))}
          </div>
        )}

        {service.metrics && (
          <div className="mt-4 pt-4 border-t border-accent/20">
            <p className="text-sm font-medium text-primary">
              {service.metrics}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};