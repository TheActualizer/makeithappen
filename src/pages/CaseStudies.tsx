import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-background">
      <Navbar />
      
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:32px_32px] opacity-25" />
        <div className="container px-4 mx-auto relative">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              Case Studies
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg text-gray-300 max-w-2xl"
            >
              Explore our success stories and learn how we've helped businesses transform their operations with AI and automation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-accent/40 backdrop-blur-sm border-accent/20 overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-500">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        {study.title}
                      </h3>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-300">
                        {study.description}
                      </p>
                      <div className="flex gap-2">
                        {study.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="bg-accent/50">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="w-full mt-4"
                    >
                      Read Case Study
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Sample case studies data
const caseStudies = [
  {
    title: "AI-Driven Manufacturing Optimization",
    description: "Helped a manufacturing company reduce downtime by 35% using predictive maintenance AI.",
    tags: ["Manufacturing", "AI", "IoT"]
  },
  {
    title: "Automated Customer Service Platform",
    description: "Implemented an AI chatbot that handled 70% of customer inquiries automatically.",
    tags: ["Customer Service", "Automation", "AI"]
  },
  {
    title: "Supply Chain Intelligence System",
    description: "Developed a smart supply chain system that reduced logistics costs by 25%.",
    tags: ["Supply Chain", "Analytics", "Optimization"]
  },
  {
    title: "Healthcare Process Automation",
    description: "Streamlined patient scheduling and record management, saving 1000+ hours monthly.",
    tags: ["Healthcare", "Automation", "Workflow"]
  },
  {
    title: "Real Estate Market Analysis Tool",
    description: "Built an AI-powered system for real-time market analysis and property valuation.",
    tags: ["Real Estate", "Analytics", "AI"]
  },
  {
    title: "Financial Trading Algorithm",
    description: "Developed an automated trading system with advanced risk management capabilities.",
    tags: ["Finance", "Algorithm", "Trading"]
  }
];

export default CaseStudies;