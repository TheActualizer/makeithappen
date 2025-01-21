import { motion } from "framer-motion";

const BlogHero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center mb-16 mx-auto max-w-4xl"
    >
      <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
        Explore Our Tech Universe
      </h1>
      <p className="text-gray-300 text-lg md:text-xl mx-auto leading-relaxed">
        Deep dive into cutting-edge AI technologies, industry transformations, and revolutionary frameworks shaping the future of business and technology.
      </p>
    </motion.div>
  );
};

export default BlogHero;