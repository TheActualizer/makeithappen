import { HeroHeader } from "./hero/HeroHeader";
import { HeroCTA } from "./hero/HeroCTA";
import { PlatformFeatures } from "./hero/PlatformFeatures";

const Hero = () => {
  return (
    <div className="relative min-h-screen py-8 lg:py-12 overflow-hidden bg-gradient-to-br from-[#1A1F2C] via-[#403E43] to-[#6E59A5]">
      {/* Isometric grid background */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.02] transform rotate-45 scale-150" />
      
      {/* Floating elements with isometric transforms */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9b87f5]/20 rounded-lg blur-3xl animate-float transform rotate-12 skew-x-12" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#33C3F0]/20 rounded-lg blur-3xl animate-float delay-1000 transform -rotate-12 skew-y-12" />
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