import { lazy, Suspense } from "react";
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

// Lazy load ServicesShowcase component
const ServicesShowcase = lazy(() => import("@/components/ServicesShowcase"));

// Loading fallback for ServicesShowcase
const ShowcaseLoader = () => (
  <div className="h-96 flex items-center justify-center bg-accent/5">
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-64 bg-accent/10 rounded" />
      <div className="h-4 w-48 bg-accent/10 rounded" />
    </div>
  </div>
);

const Services = () => {
  const navigate = useNavigate();

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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20">
      <Navbar />
      <main className="relative">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 relative">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Agentic Hive Systems for Enterprise
            </h1>
            
            {/* Carousel Section with loading optimization */}
            <div className="max-w-4xl mx-auto mb-8 relative">
              <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video overflow-hidden rounded-xl group">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
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

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                onClick={() => navigate("/start-project")}
                className="group bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300"
              >
                Start Building
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/contact")}
                className="border-gray-300 text-white hover:bg-white/10"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>

        {/* Lazy loaded ServicesShowcase */}
        <Suspense fallback={<ShowcaseLoader />}>
          <ServicesShowcase />
        </Suspense>
      </main>
    </div>
  );
};

export default Services;