import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = memo(({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
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
          contain: "paint layout"
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
});

PageTransition.displayName = "PageTransition";

export default PageTransition;