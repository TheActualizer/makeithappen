import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { ContactForm } from "@/components/contact/ContactForm";
import { Toaster } from "sonner";

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div 
      className="min-h-screen bg-accent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <motion.div 
        className="container mx-auto px-4 pt-24 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl mx-auto relative">
          {/* Decorative elements */}
          <motion.div
            className="absolute -left-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
            variants={floatingVariants}
            initial="initial"
            animate="animate"
          />
          <motion.div
            className="absolute -right-20 -bottom-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 1 }}
          />

          <div className="text-center mb-12 relative">
            <motion.h1 
              className="text-4xl font-bold text-white mb-4"
              variants={itemVariants}
            >
              Let's Innovate Together
            </motion.h1>
            <motion.p 
              className="text-gray-300"
              variants={itemVariants}
            >
              Reach out to start your rapid transformation journey
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>
      <Toaster />
    </motion.div>
  );
};

export default Contact;