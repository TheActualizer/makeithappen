import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg border-accent/20 bg-gradient-to-br from-accent/40 to-background backdrop-blur-sm">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-accent/30 p-3 group-hover:bg-accent/40 transition-colors">
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

          <div className="mt-4 flex-1 grid grid-cols-1 gap-2">
            {service.features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div className="w-1 h-1 rounded-full bg-primary" />
                {feature}
              </motion.div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-accent/20">
            <p className="text-sm font-medium text-primary">
              {service.metrics}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};