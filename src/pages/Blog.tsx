import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  BookOpen, TrendingUp, Building2, Scale, Brain, 
  Wrench, Database, FileCode, Workflow, Heart, 
  Github, Rocket, ArrowRight 
} from "lucide-react";

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

const getCategoryIcon = (slug: string) => {
  const icons = {
    'financial-automation': <TrendingUp className="w-8 h-8 text-primary" />,
    'real-estate-logistics': <Building2 className="w-8 h-8 text-primary" />,
    'legal-tech': <Scale className="w-8 h-8 text-primary" />,
    'agentic-systems': <Brain className="w-8 h-8 text-primary" />,
    'agent-tooling': <Wrench className="w-8 h-8 text-primary" />,
    'vector-systems': <Database className="w-8 h-8 text-primary" />,
    'data-engineering': <FileCode className="w-8 h-8 text-primary" />,
    'workflow-automation': <Workflow className="w-8 h-8 text-primary" />,
    'healthcare-compliance': <Heart className="w-8 h-8 text-primary" />,
    'open-source-ai': <Github className="w-8 h-8 text-primary" />,
    'rapid-prototyping': <Rocket className="w-8 h-8 text-primary" />,
    'manufacturing': <BookOpen className="w-8 h-8 text-primary" />
  };
  return icons[slug as keyof typeof icons] || <BookOpen className="w-8 h-8 text-primary" />;
};

const Blog = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching blog data...');
        const [categoriesResponse, postsResponse] = await Promise.all([
          supabase.from('blog_categories').select('*').order('name'),
          supabase
            .from('blog_posts')
            .select('*')
            .eq('status', 'published')
            .order('views', { ascending: false })
            .limit(3)
        ]);
        
        if (categoriesResponse.error) {
          console.error('Error fetching categories:', categoriesResponse.error);
          throw categoriesResponse.error;
        }
        if (postsResponse.error) {
          console.error('Error fetching posts:', postsResponse.error);
          throw postsResponse.error;
        }
        
        console.log('Categories fetched:', categoriesResponse.data);
        console.log('Featured posts fetched:', postsResponse.data);
        
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
            Deep dive into cutting-edge AI technologies, industry transformations, and revolutionary frameworks shaping the future of business and technology.
          </p>
        </motion.div>

        {/* Featured Articles Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Card 
                  className="h-full bg-accent-foreground/5 backdrop-blur-sm border-accent-foreground/10 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(article.link)}
                >
                  <div className="p-8 flex flex-col h-full">
                    <div className="mb-4">
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
        </section>

        {/* Categories Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-8">Explore Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.02 }}
              >
                <Card 
                  className="bg-accent/40 backdrop-blur-sm border border-accent/20 hover:border-primary/50 transition-all duration-300 cursor-pointer h-full"
                  onClick={() => navigate(`/blog/category/${category.slug}`)}
                >
                  <div className="p-8">
                    <div className="mb-4">
                      {getCategoryIcon(category.slug)}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{category.name}</h3>
                    <p className="text-gray-300 mb-6">{category.description}</p>
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