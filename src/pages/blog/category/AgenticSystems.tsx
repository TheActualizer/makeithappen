import React from "react";
import { motion } from "framer-motion";
import { Brain, Bot, Network, Cpu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const AgenticSystems = () => {
  const features = [
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: "Autonomous Decision Making",
      description: "AI agents that independently analyze situations and make informed decisions based on complex criteria and goals."
    },
    {
      icon: <Network className="w-8 h-8 text-primary" />,
      title: "Multi-Agent Collaboration",
      description: "Coordinated systems where multiple AI agents work together, sharing information and distributing tasks efficiently."
    },
    {
      icon: <Cpu className="w-8 h-8 text-primary" />,
      title: "Adaptive Learning",
      description: "Continuous improvement through experience, adjusting strategies based on outcomes and new information."
    },
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "Cognitive Architecture",
      description: "Sophisticated frameworks that enable reasoning, planning, and problem-solving capabilities."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/95">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 pt-32 pb-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Agentic Systems
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Explore the future of autonomous AI agents and their transformative impact on business operations
          </p>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 bg-accent/40 backdrop-blur-sm border-accent/20 h-full">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-lg">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-accent/40 backdrop-blur-sm border-accent/20 p-8 mb-12">
          <h2 className="text-3xl font-semibold text-white mb-6">
            Understanding Agentic Systems
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              Agentic systems represent a paradigm shift in artificial intelligence, 
              where AI agents operate with increasing levels of autonomy and sophistication. 
              These systems can understand complex goals, formulate strategies, and execute 
              actions while adapting to changing circumstances.
            </p>
            <p className="text-gray-300 text-lg mb-6">
              In business contexts, agentic systems can revolutionize operations by:
            </p>
            <ul className="list-disc list-inside text-gray-300 text-lg mb-6 space-y-2">
              <li>Automating complex decision-making processes</li>
              <li>Managing and optimizing resource allocation</li>
              <li>Coordinating multiple AI agents for enhanced efficiency</li>
              <li>Learning and adapting from operational data</li>
              <li>Providing predictive insights and recommendations</li>
            </ul>
          </div>
        </Card>

        {/* Call to Action */}
        <Card className="bg-accent/40 backdrop-blur-sm border-accent/20 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Implement Agentic Systems?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Transform your business operations with intelligent AI agents
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={() => window.location.href = '/contact'}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </section>
    </div>
  );
};

export default AgenticSystems;