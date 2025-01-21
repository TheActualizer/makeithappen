import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="relative w-16 h-16">
      <div className="absolute w-full h-full border-4 border-secondary/20 rounded-full"></div>
      <div className="absolute w-full h-full border-4 border-secondary rounded-full animate-spin border-t-transparent"></div>
    </div>
  </div>
);

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  useEffect(() => {
    const preloadAdjacentRoutes = async () => {
      try {
        // Preload current route
        if (location.pathname === '/blog') {
          await import('../pages/Blog');
          console.log('Blog page preloaded successfully');
        }
      } catch (error) {
        console.error('Error preloading routes:', error);
      }
    };

    preloadAdjacentRoutes();
  }, [location.pathname]);

  console.log("Page transition triggered:", location.pathname);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 0 }}
        animate={{ 
          opacity: 1,
          x: 0,
          transition: {
            type: "spring",
            mass: 0.2,
            stiffness: 500,
            damping: 30,
            velocity: 2
          }
        }}
        exit={{ 
          opacity: 0,
          x: 0,
          transition: {
            duration: 0.1,
            ease: "easeOut"
          }
        }}
        className="gpu will-change-transform"
      >
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;