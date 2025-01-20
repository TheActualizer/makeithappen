import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Rocket, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectStartModal from "@/components/ProjectStartModal";

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const values = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Innovation",
      description: "Pushing boundaries with AI-driven solutions"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Integrity",
      description: "Building trust through transparency and security"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Impact",
      description: "Creating meaningful change through technology"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            {...fadeIn}
          >
            Behind the Innovation
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 mb-8"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            Meet the Minds Shaping Tomorrow's Tech
          </motion.p>
        </div>
      </motion.section>

      {/* Vision & Mission */}
      <motion.section 
        className="py-16 px-4 bg-accent/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            {...fadeIn}
          >
            Our Vision
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto"
            {...fadeIn}
            transition={{ delay: 0.6 }}
          >
            We're on a mission to revolutionize how businesses operate through intelligent automation and AI-driven solutions. Our approach turns months of development into weeks, without compromising on quality or security.
          </motion.p>
        </div>
      </motion.section>

      {/* Video Section */}
      <motion.section 
        className="py-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            {...fadeIn}
          >
            Our Approach
          </motion.h2>
          <motion.div 
            className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden"
            {...fadeIn}
            transition={{ delay: 0.7 }}
          >
            <iframe
              src="https://www.youtube.com/embed/eXlqLTSWMv4"
              title="MakeITHappen Approach"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl"
            ></iframe>
          </motion.div>
        </div>
      </motion.section>

      {/* Founder's Story */}
      <motion.section 
        className="py-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="bg-accent/30 rounded-2xl p-8 md:p-12"
            {...fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Founder's Story</h2>
            <p className="text-lg text-gray-300 mb-6">
              With over 15 years in database design and AI integration, Ben Tzion Elchonen founded MakeITHappen with a vision to bridge the gap between complex technology and practical business solutions. His journey began when he witnessed firsthand how proper automation could transform struggling businesses into efficient powerhouses.
            </p>
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex-1 min-w-[250px] bg-accent/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Experience</h3>
                <p className="text-gray-300">15+ years in advanced tech solutions</p>
              </div>
              <div className="flex-1 min-w-[250px] bg-accent/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Expertise</h3>
                <p className="text-gray-300">Database Architecture, AI Integration, Workflow Automation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values */}
      <motion.section 
        className="py-16 px-4 bg-accent/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-background/50 rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
              >
                <div className="mb-4 inline-block p-3 bg-primary/20 rounded-full">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
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
        transition={{ delay: 1 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Redefine What's Possible?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's collaborate to shape the future of your industry
          </p>
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