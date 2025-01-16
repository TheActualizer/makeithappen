import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { ContactForm } from '@/components/contact/ContactForm';
import { SpaceshipCallBeacon } from '@/components/contact/SpaceshipCallBeacon';
import VoiceInterface from '@/components/contact/VoiceInterface';
import { Toaster } from 'sonner';

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

  return (
    <motion.div 
      className="min-h-screen bg-accent overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <motion.div 
        className="container mx-auto px-4 pt-24 pb-12 space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Beacon Section */}
        <motion.div variants={itemVariants}>
          <SpaceshipCallBeacon />
        </motion.div>

        {/* Contact Form Section */}
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl font-bold text-white mb-4"
              variants={itemVariants}
            >
              Let's Connect Across the Stars
            </motion.h1>
            <motion.p 
              className="text-gray-300"
              variants={itemVariants}
            >
              Send a transmission or initiate a direct communication link
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </motion.div>
      </motion.div>
      <VoiceInterface />
      <Toaster />
    </motion.div>
  );
};

export default Contact;