import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ServiceCard } from "./services/ServiceCard";
import { ServicesHeader } from "./services/ServicesHeader";
import { services, features } from "./services/serviceData";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const ServicesShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-background relative" id="services">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Features Section */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/10 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Integrated Features
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              Complete Business Suite
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to streamline your business operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <ServiceCard key={feature.id} service={feature} />
            ))}
          </div>
        </div>

        {/* Enterprise Solutions Section */}
        <div>
          <ServicesHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
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
};