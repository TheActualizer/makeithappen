import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { ArrowUp, MessageSquare, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlogHero from "@/components/blog/BlogHero";
import BlogCarousel from "@/components/blog/BlogCarousel";
import FeaturedArticles from "@/components/blog/FeaturedArticles";
import CategoryGrid from "@/components/blog/CategoryGrid";

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

const Blog = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching blog data...');
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('blog_categories')
          .select('*')
          .order('name');
        
        if (categoriesError) {
          console.error('Error fetching categories:', categoriesError);
          throw categoriesError;
        }
        
        console.log('Categories fetched:', categoriesData);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      title: "AI Infrastructure",
      description: "Building robust systems for the future of automation"
    },
    {
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      title: "Code Intelligence",
      description: "Advanced algorithms powering next-gen solutions"
    },
    {
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      title: "Digital Transformation",
      description: "Revolutionizing business through technology"
    },
    {
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      title: "AI Development",
      description: "Creating intelligent systems for tomorrow"
    }
  ];

  const categoryDetails: Record<string, string> = {
    'financial-automation': 'Explore how AI and automation are revolutionizing financial processes, from automated bookkeeping to intelligent fraud detection and algorithmic trading systems.',
    'real-estate-logistics': 'Discover innovative solutions for property management, smart building automation, and real estate transaction optimization using cutting-edge technology.',
    'legal-tech': 'Learn about the intersection of law and technology, including smart contracts, automated compliance systems, and AI-powered legal research tools.',
    'agentic-systems': 'Deep dive into autonomous AI agents that can perform complex tasks, make decisions, and collaborate with other agents to solve problems.',
    'agent-tooling': 'Explore the tools and frameworks used to build, deploy, and manage AI agents, including development environments and monitoring systems.',
    'vector-systems': 'Understanding vector databases, embeddings, and similarity search systems that power modern AI applications and knowledge retrieval.',
    'data-engineering': 'Master the art of building robust data pipelines, ETL processes, and data infrastructure for AI-powered applications.',
    'workflow-automation': 'Learn how to automate business processes, create efficient workflows, and integrate various tools and services seamlessly.',
    'healthcare-compliance': 'Navigate the complex world of healthcare regulations and learn how technology can ensure compliance while improving patient care.',
    'open-source-ai': 'Explore the latest in open-source AI tools, models, and frameworks that are democratizing artificial intelligence.',
    'rapid-prototyping': 'Discover methodologies and tools for quickly building and testing AI-powered applications and solutions.',
    'manufacturing': 'Learn how AI and automation are transforming manufacturing processes, quality control, and supply chain management.'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
        <BlogHero />

        {/* Tech Carousel Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          <BlogCarousel items={carouselItems} />
        </motion.div>

        <FeaturedArticles />

        {/* Categories Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Explore Topics</h2>
          <CategoryGrid categories={categories} categoryDetails={categoryDetails} />
        </section>
      </div>

      {/* Floating Action Buttons */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 space-y-4"
          >
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300"
              onClick={scrollToTop}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300"
              onClick={() => navigate('/contact')}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300"
              onClick={() => navigate('/blog/search')}
            >
              <Search className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;