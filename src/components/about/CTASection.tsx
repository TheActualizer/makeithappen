import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CTASectionProps {
  onStartProject: () => void;
}

const CTASection = ({ onStartProject }: CTASectionProps) => {
  return (
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
          onClick={onStartProject}
        >
          Start Your Project
          <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.section>
  );
};

export default CTASection;