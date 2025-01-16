import { lazy, Suspense, memo, useCallback, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Optimized lazy loading with prefetch
const ServicesShowcase = lazy(() => {
  // Prefetch the component
  const componentPromise = import("@/components/ServicesShowcase").then(module => ({
    default: memo(module.default)
  }));
  
  // Start prefetching immediately
  componentPromise.catch(() => {});
  
  return componentPromise;
});

// Optimized loading component with skeleton
const ShowcaseLoader = memo(() => (
  <div className="h-96 flex items-center justify-center bg-accent/5 animate-pulse">
    <div className="space-y-4 w-full max-w-4xl mx-auto px-4">
      <div className="h-8 w-2/3 mx-auto bg-accent/10 rounded" />
      <div className="h-4 w-1/2 mx-auto bg-accent/10 rounded" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-accent/10 rounded-lg" />
        ))}
      </div>
    </div>
  </div>
));

ShowcaseLoader.displayName = "ShowcaseLoader";

// Preload and optimize images
const images = [
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    alt: "AI Network Visualization",
    caption: "Multi-Agent Systems Working in Harmony"
  },
  {
    src: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b",
    alt: "Digital Hive Mind",
    caption: "Collective Intelligence Networks"
  },
  {
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    alt: "AI Collaboration",
    caption: "Autonomous Agent Orchestration"
  },
].map(img => {
  const image = new Image();
  image.src = img.src;
  return img;
});

const Services = memo(() => {
  const navigate = useNavigate();
  const intersectionObserver = useRef<IntersectionObserver | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  // Optimized navigation with preloading
  const handleNavigation = useCallback((path: string) => {
    console.log('Services: Navigating to', path);
    navigate(path);
  }, [navigate]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!intersectionObserver.current && showcaseRef.current) {
      intersectionObserver.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Prefetch the ServicesShowcase component
              import("@/components/ServicesShowcase");
              intersectionObserver.current?.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );

      intersectionObserver.current.observe(showcaseRef.current);
    }

    return () => {
      intersectionObserver.current?.disconnect();
    };
  }, []);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20"
      style={{ 
        contain: 'content',
        willChange: 'transform',
        isolation: 'isolate'
      }}
    >
      <Navbar />
      <main className="relative">
        {/* Hero Section - Optimized with CSS containment */}
        <section 
          className="pt-32 pb-16 px-4 relative"
          style={{ contain: 'layout style paint' }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <h1 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              style={{ willChange: 'transform' }}
            >
              Agentic Hive Systems for Enterprise
            </h1>
            
            {/* Optimized Carousel Section */}
            <div className="max-w-4xl mx-auto mb-8 relative">
              <Carousel 
                className="w-full" 
                opts={{ 
                  loop: true,
                  skipSnaps: false,
                  containScroll: 'trimSnaps'
                }}
              >
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div 
                        className="relative aspect-video overflow-hidden rounded-xl group"
                        style={{ contain: 'layout size' }}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                          fetchPriority={index === 0 ? "high" : "low"}
                          style={{ 
                            willChange: 'transform',
                            contain: 'layout size'
                          }}
                        />
                        <div 
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                          style={{ contain: 'paint' }}
                        >
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="text-xl font-semibold mb-2">{image.alt}</h3>
                            <p className="text-sm text-gray-200">{image.caption}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>

            <div 
              className="flex flex-wrap gap-4 justify-center"
              style={{ contain: 'layout' }}
            >
              <Button
                variant="default"
                size="lg"
                onClick={() => handleNavigation("/start-project")}
                className="group bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300"
                style={{ willChange: 'transform' }}
              >
                Start Building
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNavigation("/contact")}
                className="border-gray-300 text-white hover:bg-white/10"
                style={{ willChange: 'transform' }}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>

        {/* Optimized lazy loading with intersection observer */}
        <div ref={showcaseRef}>
          <Suspense fallback={<ShowcaseLoader />}>
            <ServicesShowcase />
          </Suspense>
        </div>
      </main>
    </div>
  );
});

Services.displayName = "Services";

export default Services;