import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const Blog = () => {
  const blogs = [
    {
      title: "Intelligent Chatbots: The Future of Customer Interaction",
      description: "Discover how AI-powered chatbots are revolutionizing customer service and business operations through intelligent conversation and seamless system integration.",
      link: "/blog/intelligent-chatbots",
      category: "AI Technology",
      readTime: "5 min read",
    },
    {
      title: "Agentic Systems: Redefining Autonomy in Business",
      description: "Explore how autonomous AI agents can revolutionize processes and disrupt entire industries.",
      link: "/blog/agentic-systems",
      category: "AI Technology",
      readTime: "6 min read",
    },
    {
      title: "Next-Generation Web Scraping",
      description: "Discover how intelligent research and data collection systems are transforming how organizations gather and process information.",
      link: "/blog/intelligent-scraping",
      category: "AI Technology",
      readTime: "7 min read",
    },
    {
      title: "Transformative CRM Systems",
      description: "Learn how AI-powered CRM systems are revolutionizing customer relationship management with intelligent automation.",
      link: "/blog/transformative-crm",
      category: "Business Technology",
      readTime: "6 min read",
    },
    {
      title: "Healthcare Technology & FHIR",
      description: "Explore how modern healthcare systems leverage FHIR protocols and AI for better patient care.",
      link: "/blog/healthcare-tech",
      category: "Healthcare",
      readTime: "5 min read",
    },
    {
      title: "GDPR Compliance & Open Source AI",
      description: "Understanding how to maintain GDPR compliance while leveraging open source AI solutions.",
      link: "/blog/gdpr-compliance",
      category: "Compliance",
      readTime: "6 min read",
    },
    {
      title: "AI Trends in Content Creation",
      description: "Discover how AI is transforming content creation and social media management.",
      link: "/blog/ai-trends",
      category: "Content",
      readTime: "5 min read",
    },
    {
      title: "Case Studies in AI Transformation",
      description: "Real-world examples of successful AI implementation across industries.",
      link: "/blog/case-studies",
      category: "Case Studies",
      readTime: "8 min read",
    },
    {
      title: "Transformative Accounting Systems",
      description: "How AI is revolutionizing financial operations and accounting processes.",
      link: "/blog/transformative-accounting",
      category: "Finance",
      readTime: "6 min read",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Insights and updates from our team on AI technology, automation, and digital transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={blog.link}>
                <Card className="h-full bg-accent/40 backdrop-blur-sm border-accent/20 p-6 hover:bg-accent/50 transition-colors">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                      <span className="text-sm text-gray-400">{blog.readTime}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-3">
                      {blog.title}
                    </h2>
                    <p className="text-gray-300 flex-grow">
                      {blog.description}
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;