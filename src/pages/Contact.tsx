import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { ContactForm } from "@/components/contact/ContactForm";
import { Toaster } from "sonner";

const Contact = () => {
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
            <h1 className="text-4xl font-bold text-white mb-4">
              Let's Innovate Together
            </h1>
            <p className="text-gray-300">
              Reach out to start your rapid transformation journey
            </p>
          </div>

          <ContactForm />
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
};

export default Contact;