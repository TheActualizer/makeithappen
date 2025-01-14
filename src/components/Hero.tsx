import { HeroHeader } from "./hero/HeroHeader";
import { HeroCTA } from "./hero/HeroCTA";
import { PlatformFeatures } from "./hero/PlatformFeatures";

const Hero = () => {
  return (
    <div className="relative min-h-screen py-8 lg:py-12 overflow-hidden bg-gradient-to-br from-[#9b87f5] via-[#7E69AB] to-[#8B5CF6]">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent opacity-50" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />
      
      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#D946EF] rounded-full filter blur-[128px] opacity-20 animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0EA5E9] rounded-full filter blur-[128px] opacity-20 animate-float" style={{ animationDelay: '1s' }} />
      
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