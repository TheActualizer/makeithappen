import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ServiceCard } from "./services/ServiceCard";
import ServicesHeader from "./services/ServicesHeader";
import { services } from "./services/serviceData";
import { ArrowRight } from "lucide-react";
import { memo } from "react";

const ServicesShowcase = memo(() => {
  const navigate = useNavigate();

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-background relative" id="services">
      <div className="max-w-7xl mx-auto">
        <ServicesHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="default" 
            size="lg"
            onClick={() => navigate("/start-project")}
            className="group bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300"
          >
            Start Building
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
});

ServicesShowcase.displayName = "ServicesShowcase";

export default ServicesShowcase;