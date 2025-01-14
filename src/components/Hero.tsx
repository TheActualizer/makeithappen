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

const Hero = () => {
  const navigate = useNavigate();

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

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent to-secondary/20" 
        />
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-[20%] blur-3xl transform"
        />
        <motion.div 
          animate={{ 
            rotate: [0, -360],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-40 w-[600px] h-[600px] bg-secondary/20 rounded-[30%] blur-3xl transform"
        />
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.15, 1],
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-[25%] blur-3xl transform"
        />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px] bg-opacity-20 transform rotate-45" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 relative z-10"
      >
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-8">
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
              <span className="text-sm text-gray-300">From Premium Websites to Enterprise SaaS Solutions</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
            >
              Building{" "}
              <span className="relative">
                <motion.span 
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -inset-1 blur-xl bg-gradient-to-r from-secondary via-primary to-secondary"
                />
                <span className="relative bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
                  AI-Powered
                </span>
              </span>{" "}
              Solutions
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto backdrop-blur-sm p-6 rounded-xl bg-accent/5 shadow-xl border border-accent/10"
            >
              <motion.span 
                className="inline-block font-semibold text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary"
                animate={{
                  scale: [1, 1.1, 1],
                  filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                We build 20x faster
              </motion.span>{" "}
              than traditional methods, turning ideas into production-ready solutions at lightspeed.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 transform hover:scale-105 min-w-[200px] shadow-lg hover:shadow-xl"
                onClick={() => navigate('/start-project')}
              >
                Start Building
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: 'smooth' })}
                className="border-gray-500 hover:border-white transition-colors min-w-[200px] backdrop-blur-sm shadow-lg hover:shadow-xl"
              >
                Explore Solutions
              </Button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-16 max-w-5xl mx-auto"
            >
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
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
                ].map((service, index) => (
                  <motion.div
                    key={service.title}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-6 rounded-xl bg-accent/10 backdrop-blur-sm border border-accent/20 hover:bg-accent/20 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
                    <h3 className="text-lg font-semibold text-white mb-2 relative z-10">{service.title}</h3>
                    <p className="text-sm text-gray-300 relative z-10">{service.description}</p>
                  </motion.div>
                ))}
              </div>

              <Accordion type="single" collapsible className="w-full backdrop-blur-sm">
                <AccordionItem value="capabilities" className="border-accent/20 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-accent/5">
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
                      ].map((capability, index) => (
                        <motion.div
                          key={capability}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-all duration-300 shadow-md hover:shadow-lg border border-accent/10"
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
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;