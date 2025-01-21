import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, Suspense, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // Preload adjacent routes
  useEffect(() => {
    const preloadAdjacentRoutes = async () => {
      const routes = ['/about', '/blog', '/contact', '/services'];
      const currentIndex = routes.indexOf(location.pathname);
      
      if (currentIndex !== -1) {
        const nextRoute = routes[(currentIndex + 1) % routes.length];
        const prevRoute = routes[(currentIndex - 1 + routes.length) % routes.length];
        
        try {
          // Use more specific dynamic imports that Vite can understand
          if (nextRoute === '/about') {
            await import('@/pages/About');
          } else if (nextRoute === '/blog') {
            await import('@/pages/Blog');
          } else if (nextRoute === '/contact') {
            await import('@/pages/Contact');
          } else if (nextRoute === '/services') {
            await import('@/pages/Services');
          }

          if (prevRoute === '/about') {
            await import('@/pages/About');
          } else if (prevRoute === '/blog') {
            await import('@/pages/Blog');
          } else if (prevRoute === '/contact') {
            await import('@/pages/Contact');
          } else if (prevRoute === '/services') {
            await import('@/pages/Services');
          }
        } catch (error) {
          console.error('Error preloading routes:', error);
        }
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