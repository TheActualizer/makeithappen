import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const AgenticSystems = () => {
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
          Agentic Systems: Redefining Autonomy in Business
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover how autonomous AI agents can revolutionize processes and disrupt entire industries.
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
          <h2 className="text-3xl font-semibold text-white mb-6">Why Agentic AI Matters</h2>
          <p className="text-gray-300 text-lg mb-8">
            Agentic AI empowers software to make real-time decisions, adapt to changes, and learn from outcomes—
            all without continuous human intervention. This autonomy frees your team from repetitive tasks and
            enables them to focus on high-value initiatives.
          </p>

          <h3 className="text-2xl font-semibold text-white mb-4">Key Business Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Scalable Efficiency",
                description: "AI agents can manage workflows, assign tasks, and handle large volumes of data with minimal oversight."
              },
              {
                title: "Adaptability",
                description: "Agentic systems continuously learn and optimize, detecting shifts in market dynamics or operational bottlenecks."
              },
              {
                title: "Proactive Decision-Making",
                description: "Predictive analytics and real-time insights allow these agents to prevent problems before they escalate."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-lg bg-accent/30 backdrop-blur-sm border border-accent/20"
              >
                <h4 className="text-xl font-semibold text-white mb-3">{benefit.title}</h4>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="text-2xl font-semibold text-white mb-4">Real-World Impact</h3>
          <p className="text-gray-300 text-lg mb-8">
            Imagine a logistics network that reroutes shipments autonomously in response to weather patterns,
            or a healthcare platform that schedules patient follow-ups and triages incoming data. 
            Agentic AI can transform businesses by handling these complexities at scale—dramatically reducing
            overhead and accelerating innovation.
          </p>

          <blockquote className="border-l-4 border-primary pl-6 my-8">
            <p className="text-xl text-gray-300 italic">
              "Agentic AI doesn't just automate tasks—it rethinks entire processes,
              unleashing creative potential and new market possibilities."
            </p>
          </blockquote>
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Deploy Agentic Systems?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us to explore how fully autonomous AI can supercharge your business. 
            Let's co-create a future where machines handle the minutiae, so humans can focus on what really matters.
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

export default AgenticSystems;