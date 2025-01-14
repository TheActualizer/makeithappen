import { Twitter } from "lucide-react";

export const HeroHeader = () => {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm transform hover:scale-105 transition-transform">
        <Twitter className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-medium text-primary">
          Enterprise Solutions
        </span>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
        Transform Your Vision Into
        <span className="relative mx-2">
          <span className="absolute -inset-1 blur-lg bg-primary/30"></span>
          <span className="relative text-primary">
            Digital Reality
          </span>
        </span>
      </h1>
      
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
        From custom websites to AI-powered enterprise solutions. Experience 20x faster development with our comprehensive digital transformation platform.
      </p>
    </div>
  );
};