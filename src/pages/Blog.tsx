import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Clock, Eye } from "lucide-react";

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

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

        {!loading && featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="h-full bg-accent-foreground/5 border-accent-foreground/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <div className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 mb-4 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.reading_time} min read
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.views} views
                          </span>
                        </div>
                        <span>{new Date(post.published_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                variants={item}
                className="h-[300px] animate-pulse bg-accent-foreground/10 rounded-lg"
              />
            ))
          ) : (
            categories.map((category) => (
              <motion.div
                key={category.id}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Card 
                  className="group relative overflow-hidden h-full hover:shadow-lg transition-all duration-300 bg-accent-foreground/5 backdrop-blur-sm border-accent-foreground/10"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="mb-4">
                      <BookOpen className="w-8 h-8 text-primary mb-3" />
                      <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </div>
                    <p className="text-gray-300 mb-6 flex-grow">
                      {category.description}
                    </p>
                    <Button
                      variant="secondary"
                      className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      onClick={() => navigate(`/blog/category/${category.slug}`)}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Explore {category.name}
                    </Button>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-lg transition-all duration-300" />
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;