import { Sparkle } from "lucide-react";

export const ServicesHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-4">
        <Sparkle className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">
          AI-Powered Solutions
        </span>
      </div>
      
      <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
        Enterprise-Grade Innovation
      </h2>
      <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
        Accelerate your digital transformation with our comprehensive suite of AI solutions
      </p>
    </div>
  );
};