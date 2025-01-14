import { Sparkles } from "lucide-react";

export const HeroHeader = () => {
  return (
    <div className="space-y-6 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
        <Sparkles className="w-4 h-4 text-[#0EA5E9]" />
        <span className="text-sm font-medium bg-gradient-to-r from-[#9b87f5] to-[#0EA5E9] text-transparent bg-clip-text">
          Enterprise-Grade Solutions
        </span>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        <span className="bg-gradient-to-r from-white to-white/90 text-transparent bg-clip-text">
          Transform Your Vision Into
        </span>
        <br />
        <span className="relative">
          <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-[#9b87f5]/30 to-[#0EA5E9]/30"></span>
          <span className="relative bg-gradient-to-r from-[#9b87f5] to-[#0EA5E9] text-transparent bg-clip-text">
            Digital Reality
          </span>
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
        From custom websites to AI-powered enterprise solutions. Experience 20x faster development with our comprehensive digital transformation platform.
      </p>
    </div>
  );
};