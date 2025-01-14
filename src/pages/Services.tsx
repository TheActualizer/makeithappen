import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Brain, Calculator, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const services = [
    {
      title: "Website & Business Operations",
      description: "Comprehensive digital transformation of your business operations with AI-powered automation.",
      icon: <Zap className="w-6 h-6 text-[#F97316]" />,
      color: "text-[#F97316]",
      features: [
        "AI-powered client management system",
        "CRM integration with automated workflows",
        "Zoom integration with AI meeting summaries",
        "Intelligent follow-up automation",
        "Document processing and management",
        "Client portal development"
      ]
    },
    {
      title: "Extensive AI Agent Operations",
      description: "Multi-agent swarms that revolutionize your business processes through intelligent automation.",
      icon: <Brain className="w-6 h-6 text-[#0EA5E9]" />,
      color: "text-[#0EA5E9]",
      features: [
        "Policy automation and enforcement",
        "Complex workflow orchestration",
        "Multi-agent swarm coordination",
        "Business process optimization",
        "Automated decision systems",
        "Intelligent task distribution"
      ]
    },
    {
      title: "Advanced Industry Calculations",
      description: "Specialized computation engines tailored for professional services and technical industries.",
      icon: <Calculator className="w-6 h-6 text-[#22C55E]" />,
      color: "text-[#22C55E]",
      features: [
        "Accounting automation systems",
        "Legal analysis and compliance",
        "Engineering simulations",
        "Financial modeling",
        "Risk assessment calculations",
        "Technical documentation generation"
      ]
    },
    {
      title: "Healthcare Automation",
      description: "HIPAA-compliant autonomous systems for modern healthcare operations.",
      icon: <Activity className="w-6 h-6 text-[#EC4899]" />,
      color: "text-[#EC4899]",
      features: [
        "HIPAA-compliant systems",
        "FHIR integration",
        "Patient data management",
        "Healthcare workflow automation",
        "Medical record processing",
        "Compliance monitoring"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20 pt-24">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-4">
            <Sparkles className="w-4 h-4 text-[#F97316] animate-pulse" />
            <span className="text-sm font-light tracking-wider text-[#D946EF]">
              Next-Generation Solutions
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transform Your Business with{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent">
              AI-Powered Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From website development to autonomous enterprise systems, we deliver cutting-edge solutions at unprecedented speed.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/10 hover:border-accent/30 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                {service.icon}
                <h3 className={`text-xl font-semibold ${service.color}`}>
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-gray-300">
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <div className="text-center pb-16">
          <Button
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:from-[#8B5CF6]/90 hover:to-[#D946EF]/90 transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/start-project")}
          >
            Start Your Transformation
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;