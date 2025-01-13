import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Clock, Eye, ArrowRight } from "lucide-react";

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  reading_time: number;
  views: number;
  published_at: string;
}

const Blog = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, postsResponse] = await Promise.all([
          supabase.from('blog_categories').select('*').order('name'),
          supabase
            .from('blog_posts')
            .select('*')
            .eq('status', 'published')
            .order('views', { ascending: false })
            .limit(3)
        ]);
        
        if (categoriesResponse.error) throw categoriesResponse.error;
        if (postsResponse.error) throw postsResponse.error;
        
        setCategories(categoriesResponse.data || []);
        setFeaturedPosts(postsResponse.data || []);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const featuredArticles = [
    {
      title: "Agentic Systems: Redefining Autonomy in Business",
      description: "Discover how autonomous AI agents can revolutionize processes and disrupt entire industries.",
      link: "/blog/agentic-systems",
      icon: <TrendingUp className="w-8 h-8 text-primary" />
    },
    {
      title: "AI Trends Shaping the Future",
      description: "Stay ahead of the curve with insights into emerging AI breakthroughs that will redefine competitive landscapes.",
      link: "/blog/ai-trends",
      icon: <BookOpen className="w-8 h-8 text-primary" />
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
            Explore Our Tech Universe
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Dive into cutting-edge insights, expert tutorials, and revolutionary ideas shaping the future of technology.
          </p>
        </motion.div>

        {/* Featured Articles Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Card 
                  className="h-full bg-accent-foreground/5 backdrop-blur-sm border-accent-foreground/10 hover:border-primary/50 transition-all duration-300"
                  onClick={() => navigate(article.link)}
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
                      onClick={() => navigate(article.link)}
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

        {/* Categories Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-8">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="bg-accent/40 backdrop-blur-sm border border-accent/20 hover:border-primary/50 transition-all duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-300 mb-4">{category.description}</p>
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/blog/category/${category.slug}`)}
                  >
                    Explore {category.name}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
