import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Rocket, Shield, Play, ThumbsUp, Share2, Bell } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectStartModal from "@/components/ProjectStartModal";
import { useState } from "react";

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "200+", label: "Projects Delivered" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - YouTube-style header */}
      <div className="relative pt-16 pb-32">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:32px_32px]" />
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Make IT Happen
              </h1>
              <div className="flex items-center justify-center gap-4 mb-8">
                <Button variant="outline" size="sm" className="gap-2">
                  <Bell className="w-4 h-4" />
                  Subscribe
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  Like
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Video Section */}
      <motion.section 
        className="py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-accent/30 rounded-xl overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative group cursor-pointer">
              <iframe
                src="https://www.youtube.com/embed/eXlqLTSWMv4"
                title="MakeITHappen Approach"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Play className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Our Approach to Innovation</h2>
              <p className="text-gray-400">Learn how we transform businesses through intelligent automation and AI-driven solutions.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section - Card Style */}
      <motion.section 
        className="py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-accent/30 rounded-xl p-6 text-center hover:bg-accent/40 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Values Section - Playlist Style */}
      <motion.section 
        className="py-12 px-4 bg-accent/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 px-4">Our Core Values</h2>
          <div className="space-y-4">
            {[
              { icon: <Brain className="w-6 h-6" />, title: "Innovation", description: "Pushing boundaries with AI-driven solutions" },
              { icon: <Shield className="w-6 h-6" />, title: "Integrity", description: "Building trust through transparency" },
              { icon: <Rocket className="w-6 h-6" />, title: "Impact", description: "Creating meaningful change" }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-accent/30 rounded-xl p-4 flex items-center gap-4 hover:bg-accent/40 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="p-2 bg-primary/20 rounded-lg">{value.icon}</div>
                <div>
                  <h3 className="font-semibold">{value.title}</h3>
                  <p className="text-sm text-gray-400">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <Button 
            size="lg" 
            className="group"
            onClick={() => setIsModalOpen(true)}
          >
            Start Your Project
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.section>

      <ProjectStartModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default About;