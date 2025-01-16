import { motion } from "framer-motion";
import { Brain, Network, Shield, Globe, Database, Server, Rocket, Cpu } from "lucide-react";

const capabilities = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Autonomous Development",
    description: "AI-powered code generation and optimization with human-level quality"
  },
  {
    icon: <Network className="w-8 h-8" />,
    title: "Digital Workforce",
    description: "Intelligent agents automating complex business processes 24/7"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise Security",
    description: "Military-grade protection for your business operations"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Scale",
    description: "Seamless deployment across multiple regions and platforms"
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Data Intelligence",
    description: "Advanced analytics and real-time business insights"
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: "Infinite Scalability",
    description: "Enterprise-grade infrastructure that grows with you"
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Rapid Innovation",
    description: "From concept to production in record time"
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Smart Operations",
    description: "Self-optimizing systems that learn and adapt"
  }
];

export const CapabilityShowcase = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      {capabilities.map((capability, index) => (
        <motion.div
          key={capability.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          className="group bg-accent/30 backdrop-blur-lg rounded-xl p-8 border border-secondary/20 hover:border-secondary/40 transition-all duration-300"
        >
          <div className="mb-6 text-secondary group-hover:scale-110 transform transition-transform duration-300">
            {capability.icon}
          </div>
          <h3 className="text-xl font-semibold mb-4 text-white">{capability.title}</h3>
          <p className="text-gray-300">{capability.description}</p>
        </motion.div>
      ))}
    </div>
  );
};