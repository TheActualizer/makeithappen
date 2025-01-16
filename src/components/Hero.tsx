import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const services = [
    {
      title: "AI Business Suite",
      description: "Custom websites, CRM & automation"
    },
    {
      title: "Business Process AI",
      description: "90% workflow automation"
    },
    {
      title: "Precision Systems",
      description: "Engineering-grade calculations"
    },
    {
      title: "Healthcare Suite",
      description: "HIPAA & FHIR compliant"
    }
  ];

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent to-secondary/20" 
        />
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] bg-opacity-20" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 relative z-10"
      >
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-6">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm text-gray-300">From Premium Websites to Enterprise SaaS Solutions</span>
          </motion.div>
          
          {/* Title */}
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Building{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
                AI-Powered
              </span>
            </span>{" "}
            Solutions
          </motion.h1>
          
          {/* Description */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            <span className="block backdrop-blur-sm p-6 rounded-xl bg-accent/5 border border-accent/10">
              We build{" "}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary">
                20x faster
              </span>{" "}
              than traditional methods, turning ideas into production-ready solutions at lightspeed.
            </span>
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
            <Button
              size="lg"
              className="group relative bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 min-w-[200px]"
              onClick={() => navigate('/start-project')}
            >
              Start Building
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: 'smooth' })}
              className="border-gray-500 hover:border-white min-w-[200px]"
            >
              Explore Solutions
            </Button>
          </motion.div>

          {/* Services Grid */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4'} gap-4`}>
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-xl bg-accent/10 backdrop-blur-sm border border-accent/20 hover:bg-accent/20 transition-all"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-300">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Capabilities Accordion */}
          <motion.div variants={itemVariants}>
            <Accordion type="single" collapsible className="w-full backdrop-blur-sm">
              <AccordionItem value="capabilities" className="border-accent/20">
                <AccordionTrigger className="text-gray-300 hover:text-white px-6">
                  <span className="flex items-center gap-2">
                    <ChevronDown className="h-4 w-4" />
                    View All Capabilities
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-400">
                    {[
                      "Custom Websites & CRM",
                      "AI Workflow Automation",
                      "Technical Calculations",
                      "HIPAA Compliance",
                      "Zoom Integration",
                      "Multi-Agent Systems",
                      "Legal & Finance AI",
                      "FHIR Integration"
                    ].map((capability) => (
                      <motion.div
                        key={capability}
                        whileHover={{ scale: 1.05 }}
                        className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-all border border-accent/10"
                      >
                        • {capability}
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;