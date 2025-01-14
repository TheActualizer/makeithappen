import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, TrendingUp, Building2, Scale, Brain, 
  Wrench, Database, FileCode, Workflow, Heart, 
  Github, Rocket, ArrowRight, ArrowUp, Search, 
  MessageSquare 
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

const Blog = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
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
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1DA1F2]/10 via-transparent to-[#33C3F0]/10 opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#4f4f4f1a_1px,transparent_1px)] bg-[length:20px_20px] opacity-20" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 mb-6">
                <span className="text-sm font-medium bg-gradient-to-r from-[#1DA1F2] to-[#33C3F0] bg-clip-text text-transparent">
                  Enterprise Tech Insights
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Discover Advanced{" "}
                <span className="bg-gradient-to-r from-[#1DA1F2] to-[#33C3F0] bg-clip-text text-transparent">
                  Enterprise Solutions
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Expert insights on AI integration, automation, and digital transformation strategies for modern enterprises.
              </p>

              <div className="max-w-2xl mx-auto mt-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full px-6 py-4 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] text-gray-200 placeholder-gray-400"
                  />
                  <Button 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90"
                    size="sm"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12">
                <div className="px-4 py-3 bg-white/5 rounded-lg border border-gray-700/50">
                  <div className="text-2xl font-bold text-[#1DA1F2]">200+</div>
                  <div className="text-sm text-gray-400">Articles</div>
                </div>
                <div className="px-4 py-3 bg-white/5 rounded-lg border border-gray-700/50">
                  <div className="text-2xl font-bold text-[#33C3F0]">50k+</div>
                  <div className="text-sm text-gray-400">Readers</div>
                </div>
                <div className="px-4 py-3 bg-white/5 rounded-lg border border-gray-700/50">
                  <div className="text-2xl font-bold text-[#1DA1F2]">12</div>
                  <div className="text-sm text-gray-400">Categories</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Card 
                  className="h-full bg-accent-foreground/5 backdrop-blur-sm border-accent-foreground/10 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col"
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
                      className="w-full md:w-auto group hover:bg-primary hover:text-white transition-all duration-300"
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

        <section>
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Explore Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-accent/40 backdrop-blur-sm border border-accent/20 hover:border-primary/50 transition-all duration-300">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={category.slug} className="border-none">
                      <AccordionTrigger className="p-6 hover:no-underline">
                        <div className="flex flex-col items-center text-center w-full">
                          <div className="mb-4">
                            {getCategoryIcon(category.slug)}
                          </div>
                          <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="space-y-4 text-center">
                          <p className="text-gray-300">
                            {categoryDetails[category.slug] || category.description}
                          </p>
                          <Button
                            variant="secondary"
                            className="w-full md:w-auto group hover:bg-primary hover:text-white transition-all duration-300"
                            onClick={() => navigate(`/blog/category/${category.slug}`)}
                          >
                            Explore {category.name}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

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
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-float"
              onClick={scrollToTop}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-float"
              onClick={() => navigate('/contact')}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-float"
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
