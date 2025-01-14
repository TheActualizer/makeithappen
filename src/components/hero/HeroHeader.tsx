import { Sparkles } from "lucide-react";

export const HeroHeader = () => {
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#232F3E]/5 border border-[#232F3E]/10">
        <Sparkles className="w-3.5 h-3.5 text-[#232F3E]" />
        <span className="text-xs font-medium text-[#232F3E]">Enterprise-Grade Solutions</span>
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold text-[#232F3E] mb-4">
        Transform Your Vision Into
        <span className="relative mx-2">
          <span className="absolute -inset-1 blur-sm bg-gradient-to-r from-[#232F3E]/20 to-[#FF9900]/20"></span>
          <span className="relative text-[#232F3E]">Digital Reality</span>
        </span>
      </h1>
      
      <p className="text-base md:text-lg text-[#545B64] max-w-2xl mx-auto leading-relaxed">
        From simple websites to advanced AI-powered enterprise solutions. Experience 20x faster development with our comprehensive digital transformation platform.
      </p>
    </div>
  );
};