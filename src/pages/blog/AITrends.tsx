import React from "react";
import { motion } from "framer-motion";
import { Bot, Rocket, Share2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const AITrends = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/95">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-invert mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-6">
            The Future of Content Creation: AI-Powered Social Media and Entertainment
          </h1>
          
          <div className="text-gray-300 space-y-6">
            <p className="text-xl">
              The convergence of AI and content creation is revolutionizing how we produce and distribute media across platforms. By leveraging sophisticated AI systems originally developed for financial analysis, we're now capable of generating Hollywood-quality content tailored to individual audiences.
            </p>

            <h2 className="text-2xl font-semibold text-white">Precision Content Generation</h2>
            <p>
              Just as our AI systems process financial data with exceptional accuracy, they now analyze audience preferences, engagement patterns, and cultural trends to generate highly targeted content. This precision-driven approach ensures that every piece of content resonates with its intended audience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-accent-foreground/5 p-6 rounded-lg">
                <Video className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Video Content Generation</h3>
                <p className="text-gray-300">
                  AI-powered systems can now generate script outlines, storyboards, and even preliminary renders for video content, dramatically accelerating the production process.
                </p>
              </div>
              <div className="bg-accent-foreground/5 p-6 rounded-lg">
                <Share2 className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Multi-Platform Distribution</h3>
                <p className="text-gray-300">
                  Intelligent content distribution systems automatically optimize and adapt content for different social media platforms and audience segments.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white">Database-Driven Content Strategy</h2>
            <p>
              Our robust database architecture, initially designed for financial systems, now powers a sophisticated content generation engine. This system maintains detailed profiles of audience preferences, engagement metrics, and content performance data to inform future content creation.
            </p>

            <h2 className="text-2xl font-semibold text-white">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Automated content generation for multiple platforms</li>
              <li>Personalized content tailoring based on audience analytics</li>
              <li>Real-time performance tracking and optimization</li>
              <li>Multi-modal content creation (text, images, videos)</li>
              <li>Automated A/B testing for content variations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white">Quality Assurance Systems</h2>
            <p>
              Similar to our financial validation systems, we implement multiple layers of quality checks:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Brand consistency verification</li>
              <li>Sentiment analysis</li>
              <li>Cultural sensitivity checking</li>
              <li>Engagement prediction modeling</li>
            </ul>

            <div className="bg-primary/10 p-6 rounded-lg my-8">
              <h3 className="text-xl font-semibold text-white mb-4">Looking Ahead</h3>
              <p className="text-gray-300">
                As AI technology continues to evolve, we're moving towards a future where high-quality, personalized content can be generated at scale while maintaining the authenticity and creativity that audiences demand.
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                variant="secondary"
                className="group hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() => window.history.back()}
              >
                <Rocket className="w-4 h-4 mr-2" />
                Explore More Insights
              </Button>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default AITrends;