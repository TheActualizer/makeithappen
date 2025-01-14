import { Sparkles } from "lucide-react";

export const HeroHeader = () => {
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F1F0FB] border border-[#D6BCFA]">
        <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" />
        <span className="text-xs font-medium text-[#1A1F2C]">Enterprise-Grade Solutions</span>
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold text-[#1A1F2C] mb-4">
        Transform Your Vision Into
        <span className="relative mx-2">
          <span className="absolute -inset-1 blur-sm bg-gradient-to-r from-[#D6BCFA]/30 to-[#0071DC]/20"></span>
          <span className="relative text-[#0071DC]">Digital Reality</span>
        </span>
      </h1>
      
      <p className="text-base md:text-lg text-[#8E9196] max-w-2xl mx-auto leading-relaxed">
        From simple websites to advanced AI-powered enterprise solutions. Experience 20x faster development with our comprehensive digital transformation platform.
      </p>
    </div>
  );
};