import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ServiceCard } from "./services/ServiceCard";
import ServicesHeader from "./services/ServicesHeader";
import { services } from "./services/serviceData";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { memo, useRef, useCallback } from "react";

const ServicesShowcase = memo(() => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  const handleStartBuilding = useCallback(() => {
    console.log('ServicesShowcase: Navigating to start project');
    navigate("/start-project");
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section 
      ref={ref}
      className="relative py-24 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur-lg"
      id="services"
    >
      <div className="max-w-7xl mx-auto">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:32px_32px] opacity-20" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-secondary/10 via-transparent to-transparent" />
        
        <ServicesHeader />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex"
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center relative">
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
          <Button 
            variant="default" 
            size="lg"
            onClick={handleStartBuilding}
            className="group relative bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 px-8 py-6 text-lg"
          >
            Start Building
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
});

ServicesShowcase.displayName = "ServicesShowcase";

export default ServicesShowcase;