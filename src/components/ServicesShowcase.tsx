import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ServiceCard } from "./services/ServiceCard";
import { ServicesHeader } from "./services/ServicesHeader";
import { services } from "./services/serviceData";
import { ArrowRight, Database, Cpu, Users, Network, BarChart, GitMerge } from "lucide-react";

export const ServicesShowcase = () => {
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    const icons = {
      Database,
      Cpu,
      Users,
      Network,
      BarChart,
      GitMerge
    };
    return icons[iconName as keyof typeof icons];
  };

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background via-accent/5 to-background relative" id="services">
      <div className="max-w-7xl mx-auto">
        <ServicesHeader />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = getIcon(service.icon);
            return (
              <ServiceCard 
                key={service.id} 
                service={{
                  ...service,
                  Icon: IconComponent
                }} 
              />
            );
          })}
        </div>

        <div className="mt-16 text-center space-y-4">
          <Button 
            variant="default" 
            size="lg"
            onClick={() => navigate("/start-project")}
            className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            Start Your Integration
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Connect your systems and automate your workflows with our enterprise-grade integration platform
          </p>
        </div>
      </div>
    </section>
  );
};