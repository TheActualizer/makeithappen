import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Database, Bot } from "lucide-react";
import { useState } from "react";
import ProjectStartModal from "./ProjectStartModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center space-y-8 md:space-y-12">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary animate-gradient">
                  Transform
                </span>
              </span>{" "}
              <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                Your Business
              </span>
            </h1>
          </motion.div>

          {/* Three-Layer Solution Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Database,
                title: "Enterprise Systems",
                description: "CRM + Marketing Pipeline Integration",
              },
              {
                icon: Bot,
                title: "AI Automation",
                description: "Multi-Agent Workforce Solutions",
              },
              {
                icon: Zap,
                title: "20x Speed",
                description: "SuperNova Level Disruption",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group relative p-6 bg-accent/5 backdrop-blur-sm rounded-xl border border-accent/10 hover:border-primary/20 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <feature.icon className="w-8 h-8 mx-auto text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-muted-foreground max-w-2xl mx-auto space-y-2"
          >
            <p className="font-medium text-foreground/80">
              Integrated Enterprise Suite:
            </p>
            <p>
              Client Onboarding • AI Meeting Notes • Email Automation • Project Dashboards • Document Sharing • Database Integration
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="group bg-gradient-to-r from-primary via-purple-500 to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Building
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>

      <ProjectStartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Hero;