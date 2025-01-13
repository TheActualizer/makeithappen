import React from "react";
import { ArrowLeft, BarChart3, Brain, Calculator, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const TransformativeCaseStudies = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/95">
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          className="mb-8 text-white hover:text-primary"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>

        <article className="prose prose-lg prose-invert mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6">
            Transformative Case Studies: AI-Enhanced Underwriting & Financial Analysis
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <Card className="bg-accent-foreground/5 backdrop-blur-sm p-6">
              <Calculator className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Advanced Risk Assessment
              </h3>
              <p className="text-gray-300">
                Modern AI systems combine traditional underwriting rules with machine learning to provide more accurate risk assessments while maintaining regulatory compliance.
              </p>
            </Card>

            <Card className="bg-accent-foreground/5 backdrop-blur-sm p-6">
              <Brain className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Intelligent Decision Support
              </h3>
              <p className="text-gray-300">
                Fine-tuned AI models work alongside human experts, providing data-driven insights while maintaining human oversight for critical decisions.
              </p>
            </Card>
          </div>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
            The Evolution of Financial Analysis
          </h2>
          <p className="text-gray-300">
            Traditional underwriting processes are being revolutionized through the integration of AI and machine learning technologies. By combining established financial principles with cutting-edge AI capabilities, we're creating more robust and efficient systems for risk assessment and decision-making.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            Multi-Layered Verification Systems
          </h3>
          <p className="text-gray-300">
            Our approach implements multiple layers of verification:
          </p>
          <ul className="list-disc list-inside text-gray-300 mb-6">
            <li>Traditional rule-based checks for regulatory compliance</li>
            <li>Machine learning models for pattern recognition</li>
            <li>Natural language processing for document analysis</li>
            <li>Real-time market data integration</li>
            <li>Automated risk scoring with human oversight</li>
          </ul>

          <div className="bg-accent-foreground/5 backdrop-blur-sm rounded-lg p-6 my-8">
            <BarChart3 className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-white mb-4">
              Key Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div>
                <h4 className="font-semibold mb-2">Efficiency Gains</h4>
                <ul className="list-disc list-inside">
                  <li>90% faster document processing</li>
                  <li>75% reduction in manual review time</li>
                  <li>50% decrease in decision-making time</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Risk Management</h4>
                <ul className="list-disc list-inside">
                  <li>30% improvement in risk assessment accuracy</li>
                  <li>40% reduction in false positives</li>
                  <li>Real-time fraud detection capabilities</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            Security and Compliance
          </h3>
          <div className="flex items-start gap-4 mb-6">
            <Shield className="h-6 w-6 text-primary mt-1" />
            <p className="text-gray-300">
              All AI systems are designed with security and compliance at their core, ensuring adherence to regulatory requirements while maintaining the highest standards of data protection and privacy.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
            Future Implications
          </h2>
          <p className="text-gray-300">
            As we continue to refine these systems, we're seeing the emergence of truly intelligent financial analysis platforms that can adapt to market changes, learn from historical data, and provide increasingly accurate predictions while maintaining the necessary checks and balances for responsible financial decision-making.
          </p>
        </article>
      </div>
    </div>
  );
};

export default TransformativeCaseStudies;