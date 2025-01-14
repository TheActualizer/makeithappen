import { HeroHeader } from "./hero/HeroHeader";
import { HeroCTA } from "./hero/HeroCTA";
import { PlatformFeatures } from "./hero/PlatformFeatures";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-8 overflow-hidden bg-gradient-to-b from-white to-[#F1F0FB]">
      <div className="absolute inset-0 bg-grid-white opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#F1F0FB]/80" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <HeroHeader />
          <HeroCTA />
          <PlatformFeatures />
        </div>
      </div>
    </div>
  );
};

export default Hero;