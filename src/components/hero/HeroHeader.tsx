import { Cube } from "lucide-react";

export const HeroHeader = () => {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#9b87f5]/10 to-[#33C3F0]/10 border border-white/10 backdrop-blur-sm transform hover:scale-105 transition-transform">
        <Cube className="w-3.5 h-3.5 text-[#33C3F0]" />
        <span className="text-xs font-medium bg-gradient-to-r from-[#D6BCFA] to-[#33C3F0] bg-clip-text text-transparent">
          Enterprise-Grade Solutions
        </span>
      </div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
        Transform Your Vision Into
        <span className="relative mx-2">
          <span className="absolute -inset-1 blur-lg bg-gradient-to-r from-[#9b87f5]/30 to-[#33C3F0]/30"></span>
          <span className="relative bg-gradient-to-r from-[#D6BCFA] to-[#33C3F0] bg-clip-text text-transparent">
            Digital Reality
          </span>
        </span>
      </h1>
      
      <p className="text-base md:text-lg text-[#aaadb0] max-w-2xl leading-relaxed backdrop-blur-sm">
        From custom websites to AI-powered enterprise solutions. Experience 20x faster development with our comprehensive digital transformation platform.
      </p>
    </div>
  );
};