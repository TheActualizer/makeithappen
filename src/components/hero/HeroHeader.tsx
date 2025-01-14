import { Sparkles } from "lucide-react";

export const HeroHeader = () => {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
        <Sparkles className="w-3.5 h-3.5 text-secondary" />
        <span className="text-xs font-medium text-secondary">Enterprise-Grade Solutions</span>
      </div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
        Transform Your Vision Into
        <span className="relative mx-2">
          <span className="absolute -inset-1 blur-sm bg-gradient-to-r from-secondary/30 to-primary/20"></span>
          <span className="relative text-secondary">Digital Reality</span>
        </span>
      </h1>
      
      <p className="text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
        From custom websites to AI-powered enterprise solutions. Experience 20x faster development with our comprehensive digital transformation platform.
      </p>
    </div>
  );
};