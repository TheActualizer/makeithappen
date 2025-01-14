import { HeroHeader } from "./hero/HeroHeader";
import { HeroCTA } from "./hero/HeroCTA";
import { PlatformFeatures } from "./hero/PlatformFeatures";

const Hero = () => {
  return (
    <div className="relative min-h-screen py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-accent via-accent/95 to-accent/90">
      <div className="absolute inset-0 bg-grid-white opacity-5" />
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