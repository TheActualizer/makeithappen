import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedArticles = memo(() => {
  const navigate = useNavigate();
  
  const articles = [
    {
      title: "The Rise of Agentic AI Systems",
      description: "Discover how autonomous AI agents are revolutionizing industries with independent decision-making capabilities and multi-agent collaboration.",
      link: "/blog/agentic-systems",
      icon: <Brain className="w-8 h-8 text-primary" />
    },
    {
      title: "2025 AI Trends & Transformations",
      description: "Explore the latest AI breakthroughs including multimodal advancement, enhanced business operations, and human-AI collaboration.",
      link: "/blog/ai-trends",
      icon: <TrendingUp className="w-8 h-8 text-primary" />
    }
  ];

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-semibold text-white mb-8 text-center">Featured Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="h-full"
          >
            <Card 
              className="h-full bg-gradient-to-br from-accent/95 via-primary/10 to-secondary/20 backdrop-blur-sm border-secondary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col"
              onClick={() => navigate(article.link)}
            >
              <div className="p-8 flex flex-col h-full items-center text-center">
                <div className="mb-6">
                  {article.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {article.title}
                </h3>
                <p className="text-gray-300 mb-6 flex-grow text-lg">
                  {article.description}
                </p>
                <Button
                  variant="secondary"
                  className="w-full md:w-auto group bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
});

FeaturedArticles.displayName = "FeaturedArticles";
export default FeaturedArticles;