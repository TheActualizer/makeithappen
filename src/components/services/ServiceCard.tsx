import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { memo } from "react";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  metrics?: string;
  tags?: string[];
}

interface ServiceCardProps {
  service: Service;
  priority?: boolean;
}

export const ServiceCard = memo(({ service, priority = false }: ServiceCardProps) => {
  const Icon = service.icon;
  
  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg border-accent/20 bg-gradient-to-br from-accent/40 to-background backdrop-blur-sm"
      style={{ 
        contain: 'content',
        willChange: 'transform, opacity'
      }}
    >
      <CardContent 
        className="p-6"
        style={{ contain: 'layout' }}
      >
        <div 
          className="flex items-start gap-4"
          style={{ contain: 'layout' }}
        >
          <div 
            className="rounded-lg bg-accent/30 p-3 group-hover:bg-accent/40 transition-colors"
            style={{ contain: 'layout paint' }}
          >
            <Icon 
              className="w-6 h-6 text-secondary"
              style={{ contain: 'strict' }}
            />
          </div>
          
          <div 
            className="space-y-1 flex-1"
            style={{ contain: 'layout' }}
          >
            <h3 
              className="font-semibold text-lg text-foreground group-hover:text-secondary transition-colors"
              style={{ contain: 'layout paint' }}
            >
              {service.title}
            </h3>
            <p 
              className="text-sm text-muted-foreground"
              style={{ contain: 'layout paint' }}
            >
              {service.description}
            </p>
          </div>
        </div>

        {service.tags && (
          <div 
            className="mt-4 flex flex-wrap gap-1"
            style={{ contain: 'layout' }}
          >
            {service.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-accent/30 hover:bg-accent/40"
                style={{ contain: 'layout paint' }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div 
          className="mt-4 grid grid-cols-1 gap-2"
          style={{ contain: 'layout' }}
        >
          {service.features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 text-sm text-muted-foreground"
              style={{ contain: 'layout' }}
            >
              <div 
                className="w-1 h-1 rounded-full bg-secondary"
                style={{ contain: 'layout paint' }}
              />
              {feature}
            </div>
          ))}
        </div>

        {service.metrics && (
          <div 
            className="mt-4 pt-4 border-t border-accent/20"
            style={{ contain: 'layout' }}
          >
            <p 
              className="text-sm font-medium text-secondary"
              style={{ contain: 'layout paint' }}
            >
              {service.metrics}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

ServiceCard.displayName = "ServiceCard";