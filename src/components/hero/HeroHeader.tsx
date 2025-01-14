import { Sparkles } from "lucide-react";

export const HeroHeader = () => {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20">
        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
        <span className="text-xs font-medium text-sky-300">Enterprise-Grade Solutions</span>
      </div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
        Transform Your Vision Into
        <span className="relative mx-2">
          <span className="absolute -inset-1 blur-sm bg-gradient-to-r from-sky-400/30 to-indigo-400/20"></span>
          <span className="relative text-sky-300">Digital Reality</span>
        </span>
      </h1>
      
      <p className="text-base md:text-lg text-sky-100/90 max-w-2xl leading-relaxed">
        From custom websites to AI-powered enterprise solutions. Experience 20x faster development with our comprehensive digital transformation platform.
      </p>
    </div>
  );
};