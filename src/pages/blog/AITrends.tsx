import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Cpu, Shield, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const AITrends = () => {
  const navigate = useNavigate();

  const trends = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "Large Language Models (LLMs) 2.0",
      description: "Advanced LLMs now integrate real-time data sources, memory systems, and more nuanced reasoning frameworks. They're poised to transform customer support, content creation, and business intelligence."
    },
    {
      icon: <Network className="w-8 h-8 text-primary" />,
      title: "Multi-Agent Collaboration",
      description: "Multiple AI entities can collaborate, dividing tasks and cross-verifying results—leading to swarm intelligence solutions that outperform single models in complex problem-solving."
    },
    {
      icon: <Cpu className="w-8 h-8 text-primary" />,
      title: "Edge AI & On-Device Intelligence",
      description: "Instead of funneling data to the cloud, models process information locally on devices, reducing latency and enhancing privacy—crucial for IoT applications and real-time analytics."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Ethical & Regulatory Shifts",
      description: "Governments worldwide are stepping in to regulate data usage, bias, and accountability in AI. Businesses that proactively comply gain trust and mitigate legal risk."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/95">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            AI Trends Shaping the Future
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Stay ahead of the curve with insights into emerging AI breakthroughs that will redefine competitive landscapes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {trends.map((trend, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-accent-foreground/5 backdrop-blur-sm border-accent-foreground/10 hover:border-primary/50 transition-all duration-300">
                <div className="p-6">
                  <div className="mb-4">{trend.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {trend.title}
                  </h3>
                  <p className="text-gray-300">
                    {trend.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl text-center text-white italic mb-16 max-w-4xl mx-auto"
        >
          "AI evolution isn't slowing down—it's accelerating. The winners will be the businesses that pivot fast 
           and harness these trends before competitors do."
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">
            Ready to Adopt These Trends?
          </h3>
          <Button
            size="lg"
            onClick={() => navigate("/contact")}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Learn How We Implement Leading-Edge AI
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default AITrends;