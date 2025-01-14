import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Network, Shield, Activity, ChartBar, Stethoscope, Factory } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const AITrends = () => {
  const navigate = useNavigate();

  const trends = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "Agentic AI Revolution",
      description: "25% of organizations expected to initiate agentic AI pilots, focusing on autonomous agents capable of independent decision-making and multi-agent systems working together on complex tasks."
    },
    {
      icon: <Activity className="w-8 h-8 text-primary" />,
      title: "Enhanced Business Operations",
      description: "AI-powered agents handling complex workflows autonomously with real-time decision-making and seamless integration with existing business systems."
    },
    {
      icon: <Network className="w-8 h-8 text-primary" />,
      title: "Human-AI Collaboration",
      description: "Shift from AI as a tool to AI as a collaborative partner, unlocking $15.7 trillion in economic value by 2030 through augmented human capabilities."
    },
    {
      icon: <ChartBar className="w-8 h-8 text-primary" />,
      title: "Multimodal AI Advancement",
      description: "Processing of text, images, audio, and video simultaneously with enhanced context understanding and improved accuracy across different media types."
    }
  ];

  const industries = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Financial Services",
      description: "Autonomous trading systems, personalized banking experiences, and enhanced risk assessment with fraud detection capabilities."
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-primary" />,
      title: "Healthcare",
      description: "AI-assisted diagnostics, personalized treatment plans, and accelerated medical research through advanced AI systems."
    },
    {
      icon: <Factory className="w-8 h-8 text-primary" />,
      title: "Manufacturing",
      description: "Predictive maintenance, supply chain optimization, and automated quality control systems powered by AI."
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
            AI Trends Shaping 2025
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Explore the transformative AI trends that are revolutionizing industries and redefining the future of technology.
          </p>
        </motion.div>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-white mb-8">Key AI Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-white mb-8">Industry Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
              >
                <Card className="h-full bg-accent-foreground/5 backdrop-blur-sm border-accent-foreground/10 hover:border-primary/50 transition-all duration-300">
                  <div className="p-6">
                    <div className="mb-4">{industry.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {industry.title}
                    </h3>
                    <p className="text-gray-300">
                      {industry.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => navigate("/contact")}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Explore AI Solutions for Your Business
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default AITrends;