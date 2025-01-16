import { motion } from "framer-motion";
import { Database, Cpu, Gauge, Clock } from "lucide-react";

const metrics = [
  {
    icon: <Clock className="w-6 h-6" />,
    value: "95%",
    label: "Time Reduction",
    description: "In development cycles"
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    value: "99.9%",
    label: "Automation Rate",
    description: "In routine tasks"
  },
  {
    icon: <Database className="w-6 h-6" />,
    value: "10x",
    label: "Efficiency Gain",
    description: "Over traditional methods"
  },
  {
    icon: <Gauge className="w-6 h-6" />,
    value: "24/7",
    label: "Operation Time",
    description: "Continuous deployment"
  }
];

export const EnterpriseMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          className="bg-accent/30 backdrop-blur-lg rounded-xl p-6 border border-secondary/20 hover:border-secondary/40 transition-all duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
              {metric.icon}
            </div>
            <h3 className="text-3xl font-bold text-secondary">{metric.value}</h3>
          </div>
          <p className="text-lg font-semibold text-gray-200 mb-2">{metric.label}</p>
          <p className="text-sm text-gray-400">{metric.description}</p>
        </motion.div>
      ))}
    </div>
  );
};