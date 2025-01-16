import { useEffect, useCallback, memo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface LazyLoadedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const LazyLoadedSection = memo(({ 
  children, 
  className = "", 
  delay = 0.2 
}: LazyLoadedSectionProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px'
  });

  const startAnimation = useCallback(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          delay: delay,
          ease: [0.22, 1, 0.36, 1]
        }
      });
    }
  }, [controls, inView, delay]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className={className}
      style={{
        willChange: "transform, opacity",
        contain: "content",
      }}
    >
      {children}
    </motion.div>
  );
});

LazyLoadedSection.displayName = "LazyLoadedSection";