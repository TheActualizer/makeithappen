import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { ContactForm } from "@/components/contact/ContactForm";
import { Toaster } from "sonner";

const Contact = () => {
  // Optimized container variants with faster transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        type: "spring",
        stiffness: 500,
        damping: 25,
        mass: 0.5
      },
    },
  };

  // Enhanced item variants with spring physics
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
        mass: 0.5,
        velocity: 2
      },
    },
  };

  // Optimized floating animation with correct type for repeatType
  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-5, 5],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror" as const, // Fixed type here
        ease: "easeInOut"
      },
    },
  };

  // Generate optimized stars with hardware acceleration
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <motion.div 
      className="min-h-screen bg-accent overflow-hidden will-change-transform"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      style={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: 1000,
      }}
    >
      <Navbar />
      <motion.div 
        className="container mx-auto px-4 pt-24 pb-12 gpu"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl mx-auto relative">
          {/* Optimized background with hardware acceleration */}
          <div className="fixed inset-0 -z-10 bg-gradient-to-b from-accent to-accent/95 gpu">
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white/80 gpu"
                style={{
                  width: star.size,
                  height: star.size,
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  transform: 'translate3d(0, 0, 0)',
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Optimized decorative elements */}
          <motion.div
            className="absolute -left-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl gpu"
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          />
          <motion.div
            className="absolute -right-20 -bottom-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl gpu"
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          />

          <div className="text-center mb-12 relative">
            <motion.h1 
              className="text-4xl font-bold text-white mb-4 relative z-10 gpu"
              variants={itemVariants}
            >
              Let's Innovate Together
            </motion.h1>
            <motion.p 
              className="text-gray-300 gpu"
              variants={itemVariants}
            >
              Reach out to start your rapid transformation journey
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="relative z-10 gpu"
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