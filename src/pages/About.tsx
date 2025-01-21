import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Rocket, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectStartModal from "@/components/ProjectStartModal";
import { useModal } from "@/hooks/use-modal";

const About = () => {
  useEffect(() => {
    // Scroll restoration with reduced layout shifts
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Memoize static values
  const values = useMemo(() => [
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
  ], []);

  const { isOpen, onOpen, onClose } = useModal();

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Simplified animations */}
      <motion.section 
        className="pt-32 pb-16 px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 variants={itemVariants}>
            Behind the Innovation
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-400 mb-8"
          >
            Meet the Minds Shaping Tomorrow's Tech
          </motion.p>
        </div>
      </motion.section>

      {/* Vision & Mission - Static section for better performance */}
      <section className="py-16 px-4 bg-accent/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Our Vision
          </h2>
          <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto">
            We're on a mission to revolutionize how businesses operate through intelligent automation and AI-driven solutions. Our approach turns months of development into weeks, without compromising on quality or security.
          </p>
        </div>
      </section>

      {/* Video Section - Optimized loading */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Our Approach
          </h2>
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-accent/20">
            <iframe
              src="https://www.youtube.com/embed/eXlqLTSWMv4"
              title="MakeITHappen Approach"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Values Section - CSS-based animations */}
      <section className="py-16 px-4 bg-accent/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-background/50 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:bg-background/60"
              >
                <div className="mb-4 inline-block p-3 bg-primary/20 rounded-full">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Simple fade animation */}
      <motion.section 
        className="py-16 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Redefine What's Possible?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's collaborate to shape the future of your industry
          </p>
          <Button 
            size="lg" 
            className="group transform transition-all duration-300 hover:scale-105"
            onClick={onOpen}
          >
            Start Your Project
            <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </motion.section>

      <ProjectStartModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default About;