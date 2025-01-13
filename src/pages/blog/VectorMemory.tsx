import React from "react";
import { motion } from "framer-motion";
import { Database, Network, Cpu } from "lucide-react";

const VectorMemory = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-4xl"
      >
        <h1 className="text-4xl font-bold mb-8 text-white">Vector Databases & Memory Systems</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              Understanding Vector Databases
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Vector databases are specialized systems designed to store and retrieve high-dimensional vectors, 
              which are crucial for modern AI applications. These vectors represent complex data like text, 
              images, or audio in a format that machines can understand and process efficiently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
              <Network className="h-6 w-6 text-primary" />
              Types of LLM Memory Systems
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Large Language Models (LLMs) employ various memory systems to maintain context and improve 
              response accuracy. These include short-term memory for immediate context, working memory 
              for active processing, and long-term memory through vector storage for persistent knowledge.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
              <Cpu className="h-6 w-6 text-primary" />
              Technical Benefits & Implementation
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Vector databases enable efficient similarity search, making it possible to find relevant 
              information quickly in large datasets. This capability is essential for:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Semantic search and retrieval</li>
              <li>Context-aware responses</li>
              <li>Knowledge base integration</li>
              <li>Real-time information updates</li>
            </ul>
          </section>

          <section className="bg-accent/30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-white">Business Impact</h3>
            <p className="text-gray-300 leading-relaxed">
              Organizations implementing vector databases and advanced memory systems can expect improved 
              accuracy in AI responses, better context retention, and more personalized user interactions. 
              This leads to enhanced customer experiences and more efficient business processes.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default VectorMemory;