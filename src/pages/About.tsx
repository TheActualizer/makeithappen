import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectStartModal from "@/components/ProjectStartModal";
import { EnterpriseMetrics } from "@/components/about/EnterpriseMetrics";
import { CapabilityShowcase } from "@/components/about/CapabilityShowcase";

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-16 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            The Future of Enterprise Development
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Transform your business with AI-powered automation and digital workforce solutions
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-lg px-8"
              onClick={() => setIsModalOpen(true)}
            >
              Start Your Transformation
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="ghost" 
              className="text-lg px-8 hover:bg-white/10"
            >
              Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Enterprise Metrics */}
        <div className="mt-24 px-4">
          <EnterpriseMetrics />
        </div>
      </motion.section>

      {/* Capabilities Showcase */}
      <motion.section 
        className="py-24 px-4 bg-accent/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Enterprise-Grade Capabilities
          </motion.h2>
          <CapabilityShowcase />
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section 
        className="py-24 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                Our Vision for Digital Enterprise
              </h2>
              <div className="space-y-4 text-xl text-gray-300">
                <p>
                  We're revolutionizing how enterprises operate by automating 95% of 
                  development and business processes, leaving humans free to focus on 
                  strategic innovation.
                </p>
                <p>
                  Our AI-powered platform delivers enterprise-grade solutions at 
                  unprecedented speed, while maintaining the highest standards of 
                  security and reliability.
                </p>
              </div>
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90"
                onClick={() => setIsModalOpen(true)}
              >
                Transform Your Enterprise
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            <motion.div
              className="lg:h-[600px] rounded-xl bg-accent/30 backdrop-blur-lg border border-secondary/20 p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Add visualization or stats here */}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <ProjectStartModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default About;