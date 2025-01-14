import { HeroHeader } from "./hero/HeroHeader";
import { HeroCTA } from "./hero/HeroCTA";
import { PlatformFeatures } from "./hero/PlatformFeatures";

const Hero = () => {
  return (
    <div className="relative min-h-screen py-8 lg:py-12 overflow-hidden bg-gradient-to-br from-sky-900 via-sky-800 to-indigo-900">
      <div className="absolute inset-0 bg-grid-white opacity-[0.02]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <HeroHeader />
          <HeroCTA />
          <PlatformFeatures />
        </div>
      </div>
    </div>
  );
};

export default Hero;