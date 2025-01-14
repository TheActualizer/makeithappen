import { HeroHeader } from "./hero/HeroHeader";
import { HeroCTA } from "./hero/HeroCTA";
import { PlatformFeatures } from "./hero/PlatformFeatures";

const Hero = () => {
  return (
    <div className="relative min-h-screen py-8 lg:py-12 overflow-hidden bg-white dark:bg-gray-900">
      {/* Twitter-style grid background */}
      <div className="absolute inset-0 bg-grid-blue/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:[mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5))]" />
      
      {/* Floating elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <HeroHeader />
          <HeroCTA />
          <PlatformFeatures />
        </div>
      </div>
    </div>
  );
};

export default Hero;