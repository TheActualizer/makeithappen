import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Brain, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Blog = () => {
  const navigate = useNavigate();

  const featuredArticles = [
    {
      title: "Modernizing Healthcare with FHIR & AI",
      description: "Explore how FHIR protocols and modern AI are transforming healthcare while maintaining HIPAA compliance.",
      icon: <Stethoscope className="h-8 w-8 text-primary" />,
      link: "/blog/healthcare-tech"
    },
    {
      title: "Vector Databases & Memory",
      description: "Explore how vector databases and advanced memory systems enhance AI precision and context.",
      icon: <Brain className="h-8 w-8 text-primary" />,
      link: "/blog/vector-memory"
    },
    {
      title: "Transforming Financial Operations",
      description: "Discover how AI-powered accounting systems are revolutionizing financial operations through intelligent automation.",
      icon: <Bot className="h-8 w-8 text-primary" />,
      link: "/blog/transformative-accounting"
    }
  ];

  const categories = [
    {
      id: 1,
      name: "AI Technology",
      description: "Latest developments in artificial intelligence and machine learning",
      slug: "ai-technology"
    },
    {
      id: 2,
      name: "Business Impact",
      description: "How AI is transforming businesses and industries",
      slug: "business-impact"
    },
    {
      id: 3,
      name: "Implementation",
      description: "Practical guides and best practices for AI implementation",
      slug: "implementation"
    }
  ];

  const handleArticleClick = (link: string) => {
    console.log('Navigating to:', link);
    navigate(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/95">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Latest Insights
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our latest articles on AI technology, implementation strategies, and success stories.
          </p>
        </motion.div>

        {/* Featured Articles */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-white mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="h-full cursor-pointer"
                onClick={() => handleArticleClick(article.link)}
              >
                <Card 
                  className="h-full bg-accent-foreground/5 backdrop-blur-sm border-accent-foreground/10 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="mb-4">
                      {article.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 mb-6 flex-grow">
                      {article.description}
                    </p>
                    <Button
                      variant="secondary"
                      className="w-full group hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-8">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <Card 
                  className="bg-accent/40 backdrop-blur-sm border border-accent/20 hover:border-primary/50 transition-all duration-300"
                  onClick={() => navigate(`/blog/category/${category.slug}`)}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                    <p className="text-gray-300 mb-4">{category.description}</p>
                    <Button
                      variant="secondary"
                      className="w-full group hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Explore {category.name}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
