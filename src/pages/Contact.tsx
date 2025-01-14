import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { ContactForm } from "@/components/contact/ContactForm";
import { Toaster } from "sonner";

const Contact = () => {
  const textReveal = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-accent">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl font-bold text-white mb-4"
              initial="hidden"
              animate="visible"
              variants={textReveal}
            >
              Let's Innovate Together
            </motion.h1>
            <motion.p 
              className="text-gray-300"
              initial="hidden"
              animate="visible"
              variants={textReveal}
              transition={{ delay: 0.2 }}
            >
              Reach out to start your rapid transformation journey
            </motion.p>
          </div>

          <ContactForm />
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
};

export default Contact;