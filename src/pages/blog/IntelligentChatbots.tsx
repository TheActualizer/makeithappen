import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const IntelligentChatbots = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 pt-32 pb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Intelligent Chatbots: The Future of Customer Interaction
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover how AI-powered chatbots are revolutionizing customer service and business operations through intelligent conversation and seamless system integration.
        </p>
      </motion.section>

      {/* Content Section */}
      <motion.article 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="container mx-auto px-4 py-12"
      >
        <Card className="bg-accent/40 backdrop-blur-sm border-accent/20 p-8 mb-12">
          <h2 className="text-3xl font-semibold text-white mb-6">The Evolution of Chatbot Intelligence</h2>
          <p className="text-gray-300 text-lg mb-8">
            Modern chatbots have evolved far beyond simple question-and-answer systems. Today's intelligent
            agents can understand context, maintain conversation history, and seamlessly integrate with
            various business systems to provide comprehensive support and service.
          </p>

          <h3 className="text-2xl font-semibold text-white mb-4">Key Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Contextual Understanding",
                description: "Advanced natural language processing enables deep comprehension of user intent and conversation context."
              },
              {
                title: "System Integration",
                description: "Seamless connection with CRM, databases, and business tools for real-time data access and updates."
              },
              {
                title: "Proactive Engagement",
                description: "Intelligent follow-ups, appointment scheduling, and personalized recommendations based on user history."
              }
            ].map((capability, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-lg bg-accent/30 backdrop-blur-sm border border-accent/20"
              >
                <h4 className="text-xl font-semibold text-white mb-3">{capability.title}</h4>
                <p className="text-gray-300">{capability.description}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="text-2xl font-semibold text-white mb-4">Practical Applications</h3>
          <div className="space-y-4 text-gray-300 text-lg mb-8">
            <p>
              <strong className="text-white">Customer Service Excellence:</strong> Handle complex inquiries,
              manage tickets, and provide instant support while maintaining conversation context and history.
            </p>
            <p>
              <strong className="text-white">Sales Automation:</strong> Qualify leads, schedule demos,
              and maintain follow-up sequences while integrating with your CRM and sales tools.
            </p>
            <p>
              <strong className="text-white">Administrative Support:</strong> Manage calendars, coordinate
              meetings, and handle document processing with intelligent workflow automation.
            </p>
          </div>

          <blockquote className="border-l-4 border-primary pl-6 my-8">
            <p className="text-xl text-gray-300 italic">
              "The future of business communication lies in intelligent chatbots that don't just respond,
              but truly understand, learn, and evolve with each interaction."
            </p>
          </blockquote>

          <h3 className="text-2xl font-semibold text-white mb-4">Integration Capabilities</h3>
          <ul className="list-disc list-inside text-gray-300 text-lg space-y-3 mb-8">
            <li>Real-time database access and updates</li>
            <li>Document processing and management</li>
            <li>Calendar and scheduling coordination</li>
            <li>CRM system integration</li>
            <li>Automated workflow triggers</li>
            <li>Analytics and reporting dashboards</li>
          </ul>
        </Card>
      </motion.article>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <Card className="bg-accent/40 backdrop-blur-sm border-accent/20 p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Transform Your Business Communication</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to elevate your customer interactions with intelligent chatbot technology?
            Let's discuss how we can integrate smart conversation systems into your business workflow.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/contact")}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </motion.section>
    </div>
  );
};

export default IntelligentChatbots;