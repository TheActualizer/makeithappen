import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const CaseStudies = () => {
  const navigate = useNavigate();

  const caseStudies = [
    {
      title: "Healthcare Automation",
      description: "By deploying an autonomous scheduling system for a network of clinics, we reduced patient wait times by 40%. The AI algorithm adapted to daily no-show patterns, ensuring optimal resource allocation and cost savings.",
      outcome: "$1.2M in overhead reductions within 12 months",
      industry: "Healthcare"
    },
    {
      title: "E-Commerce Personalization",
      description: "Our dynamic recommendation engine harnessed user behavior data, increasing average order values by 30%. Real-time AI-based product suggestions tailored to each user's browsing habits, driving conversions.",
      outcome: "25% boost in repeat purchases",
      industry: "E-Commerce"
    },
    {
      title: "Financial Fraud Detection",
      description: "We implemented a memory-based anomaly detection framework that flags suspicious transactions in microseconds. This system helped a major bank cut fraud losses by 60% while maintaining top-tier customer satisfaction.",
      outcome: "45% reduction in false positives over 6 months",
      industry: "Finance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/95">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Transformative Case Studies
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Explore real-world examples of how our AI solutions catalyze disruptive growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-accent-foreground/5 backdrop-blur-sm border-accent-foreground/10 hover:border-primary/50 transition-all duration-300">
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                      {study.industry}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {study.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {study.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-accent-foreground/10">
                    <p className="text-primary font-semibold">
                      Key Outcome: {study.outcome}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-accent/40 backdrop-blur-sm border-accent/20 p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Be Our Next Success Story?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact us to learn how we can customize advanced AI solutions for your business.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/contact")}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Get Started
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CaseStudies;