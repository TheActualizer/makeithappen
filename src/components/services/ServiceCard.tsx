import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  href: string;
}

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative"
    >
      {/* Background layers for 3D effect */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-secondary/20 blur-sm" />
      <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl bg-primary/10" />
      
      <Card 
        className="group relative overflow-hidden transition-all duration-300 
          hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-accent/20 
          bg-gradient-to-br from-accent/40 via-accent/30 to-background/80 
          backdrop-blur-xl rounded-2xl transform perspective-1000
          hover:translate-z-10 hover:-translate-y-1
          before:absolute before:inset-0 before:bg-gradient-to-br 
          before:from-white/5 before:to-transparent before:rounded-2xl
          after:absolute after:inset-0 after:bg-gradient-to-br 
          after:from-transparent after:to-black/5 after:rounded-2xl"
      >
        {/* Top edge highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        {/* Right edge highlight */}
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
        
        <div className="relative p-6 flex flex-col h-full z-10">
          <div className="mb-4 p-2 rounded-xl bg-gradient-to-br from-accent/30 to-transparent
            backdrop-blur-md border border-white/5 inline-block">
            {service.icon}
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-secondary transition-colors">
            {service.title}
          </h3>
          
          <p className="text-gray-300 mb-6 flex-grow">
            {service.description}
          </p>
          
          <Button
            variant="secondary"
            className="w-full group/btn bg-gradient-to-r from-secondary/80 to-primary/80
              hover:from-secondary hover:to-primary transition-all duration-300
              shadow-lg hover:shadow-secondary/20 border border-white/10
              hover:border-white/20"
            onClick={() => navigate(service.href)}
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};