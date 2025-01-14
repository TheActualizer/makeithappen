import { Sparkles } from "lucide-react";

export const HeroHeader = () => {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10 backdrop-blur-sm">
        <Sparkles className="w-3.5 h-3.5 text-blue-300" />
        <span className="text-xs font-medium bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">Enterprise-Grade Solutions</span>
      </div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
        Transform Your Vision Into
        <span className="relative mx-2">
          <span className="absolute -inset-1 blur-lg bg-gradient-to-r from-purple-500/30 to-blue-500/30"></span>
          <span className="relative bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">Digital Reality</span>
        </span>
      </h1>
      
      <p className="text-base md:text-lg text-gray-300/90 max-w-2xl leading-relaxed backdrop-blur-sm">
        From custom websites to AI-powered enterprise solutions. Experience 20x faster development with our comprehensive digital transformation platform.
      </p>
    </div>
  );
};