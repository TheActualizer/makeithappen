import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Database, Brain, Memory, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const VectorMemory = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20">
      <Navbar />
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 pt-32 pb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Vector Databases & LLM Memory Systems
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Exploring how vector databases and advanced memory systems enhance AI precision and context retention.
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
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <Database className="h-8 w-8 text-primary" />
                Understanding Vector Databases
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Vector databases are specialized systems designed to store and retrieve high-dimensional vectors—mathematical 
                representations of data that capture semantic meaning. These systems are crucial for modern AI applications, 
                enabling efficient similarity searches and semantic matching.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-accent/30 p-6 border-accent/20">
                  <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Efficient similarity search algorithms</li>
                    <li>• Scalable vector indexing</li>
                    <li>• Real-time vector computations</li>
                    <li>• Optimized storage formats</li>
                  </ul>
                </Card>
                <Card className="bg-accent/30 p-6 border-accent/20">
                  <h3 className="text-xl font-semibold text-white mb-3">Applications</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Semantic search engines</li>
                    <li>• Recommendation systems</li>
                    <li>• Image similarity matching</li>
                    <li>• Natural language processing</li>
                  </ul>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <Memory className="h-8 w-8 text-primary" />
                LLM Memory Systems
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Memory systems in Large Language Models (LLMs) enable these AI systems to maintain context and recall 
                information across long conversations. Advanced memory architectures combine different types of memory 
                to enhance model performance and interaction quality.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    title: "Short-Term Memory",
                    description: "Handles immediate context and recent interactions, crucial for maintaining conversation coherence.",
                    icon: <Brain className="h-6 w-6 text-primary" />
                  },
                  {
                    title: "Long-Term Memory",
                    description: "Stores persistent information and learned patterns, enabling consistent personality and knowledge retention.",
                    icon: <Database className="h-6 w-6 text-primary" />
                  },
                  {
                    title: "Working Memory",
                    description: "Processes and manipulates active information, essential for complex reasoning and problem-solving.",
                    icon: <Cpu className="h-6 w-6 text-primary" />
                  }
                ].map((memory, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-lg bg-accent/30 backdrop-blur-sm border border-accent/20"
                  >
                    <div className="mb-4">{memory.icon}</div>
                    <h4 className="text-xl font-semibold text-white mb-3">{memory.title}</h4>
                    <p className="text-gray-300">{memory.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white mb-6">Enhancing AI Precision</h2>
              <p className="text-gray-300 text-lg mb-6">
                The combination of vector databases and sophisticated memory systems creates AI applications with 
                unprecedented precision and contextual awareness. This synergy enables:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Technical Benefits</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Improved context retention across conversations</li>
                    <li>• More accurate information retrieval</li>
                    <li>• Better handling of complex queries</li>
                    <li>• Enhanced pattern recognition</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Business Impact</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• More personalized user experiences</li>
                    <li>• Reduced response latency</li>
                    <li>• Lower computational costs</li>
                    <li>• Improved decision-making accuracy</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Enhance Your AI Systems?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's explore how vector databases and advanced memory systems can transform your AI applications.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/contact")}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </motion.section>
    </div>
  );
};

export default VectorMemory;