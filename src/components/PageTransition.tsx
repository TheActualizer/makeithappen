import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    // Skip animation on first mount
    if (isFirstMount) {
      setIsFirstMount(false);
    }
  }, [isFirstMount]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={isFirstMount ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          willChange: "transform, opacity",
          isolation: "isolate",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;