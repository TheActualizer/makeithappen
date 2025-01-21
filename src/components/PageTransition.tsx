import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, Suspense } from "react";
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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;