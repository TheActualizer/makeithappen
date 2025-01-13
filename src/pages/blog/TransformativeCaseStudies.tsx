import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, LineChart, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const TransformativeCaseStudies = () => {
  const navigate = useNavigate();

  const caseStudies = [
    {
      title: "E-commerce Giant Revolutionizes Customer Service",
      industry: "Retail",
      challenge: "Manual customer support causing delays and inconsistencies",
      solution: "Implemented AI-powered chatbots and automated ticket routing",
      outcomes: [
        "90% reduction in response time",
        "75% decrease in support costs",
        "98% customer satisfaction rate"
      ],
      icon: <TrendingUp className="w-8 h-8 text-primary" />
    },
    {
      title: "Healthcare Provider Optimizes Patient Care",
      industry: "Healthcare",
      challenge: "Inefficient scheduling and resource allocation",
      solution: "Deployed predictive analytics and automated scheduling system",
      outcomes: [
        "30% increase in patient capacity",
        "45% reduction in wait times",
        "85% staff satisfaction improvement"
      ],
      icon: <LineChart className="w-8 h-8 text-primary" />
    },
    {
      title: "Manufacturing Plant Achieves Smart Automation",
      industry: "Manufacturing",
      challenge: "Quality control inconsistencies and production delays",
      solution: "Integrated IoT sensors with AI-powered quality monitoring",
      outcomes: [
        "50% defect reduction",
        "35% increase in production speed",
        "60% decrease in manual inspections"
      ],
      icon: <Zap className="w-8 h-8 text-primary" />
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
            Transformative Case Studies
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Explore real-world examples of how our AI solutions drive measurable business outcomes
            and transform operations across industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-accent-foreground/5 backdrop-blur-sm border-accent-foreground/10 hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="mb-4">{study.icon}</div>
                  <Badge className="mb-3 bg-primary/20 text-primary hover:bg-primary/30">
                    {study.industry}
                  </Badge>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {study.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-1">Challenge</h4>
                      <p className="text-gray-300">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-1">Solution</h4>
                      <p className="text-gray-300">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2">Key Outcomes</h4>
                      <ul className="space-y-2">
                        {study.outcomes.map((outcome, i) => (
                          <li key={i} className="text-gray-300 flex items-center">
                            <ArrowRight className="w-4 h-4 text-primary mr-2" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">
            Ready to Transform Your Business?
          </h3>
          <Button
            size="lg"
            onClick={() => navigate("/contact")}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Start Your Success Story
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default TransformativeCaseStudies;