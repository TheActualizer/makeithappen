import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 mx-auto max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
            Explore Our Tech Universe
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mx-auto leading-relaxed">
            Deep dive into cutting-edge AI technologies, industry transformations, and revolutionary frameworks shaping the future of business and technology.
          </p>
        </motion.div>

        {/* Tech Carousel Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {carouselItems.map((item, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden bg-gradient-to-br from-accent/95 via-primary/10 to-secondary/20 backdrop-blur-sm border-secondary/20 h-full">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/50 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-200 text-sm md:text-base">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-secondary/20 hover:bg-secondary/30 border-secondary/30" />
            <CarouselNext className="hidden md:flex -right-12 bg-secondary/20 hover:bg-secondary/30 border-secondary/30" />
          </Carousel>
        </motion.div>

        {/* Featured Articles Section */}
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

        {/* Categories Section */}
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
                <Card className="bg-gradient-to-br from-accent/95 via-primary/10 to-secondary/20 backdrop-blur-sm border-secondary/20 hover:border-primary/50 transition-all duration-300">
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
                            className="w-full md:w-auto group bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300"
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
              className="rounded-full shadow-lg bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 animate-float"
              onClick={scrollToTop}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 animate-float"
              onClick={() => navigate('/contact')}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 animate-float"
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
