import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ServiceCard } from "./services/ServiceCard";
import { ServicesHeader } from "./services/ServicesHeader";
import { services } from "./services/serviceData";

export const ServicesShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-background relative" id="services">
      <div className="max-w-7xl mx-auto">
        <ServicesHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id}>
              <ServiceCard service={service} />
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
            Start Your Digital Transformation
          </Button>
          <p className="mt-4 text-sm text-gray-400">
            Ready to revolutionize your business operations? Let's discuss your project.
          </p>
        </div>
      </div>
    </section>
  );
};