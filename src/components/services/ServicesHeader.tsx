import { Sparkle } from "lucide-react";

export const ServicesHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-4">
        <Sparkle className="w-4 h-4 text-secondary" />
        <span className="text-sm font-medium text-muted-foreground">
          Enterprise-Grade Solutions
        </span>
      </div>
      
      <h2 className="text-3xl font-bold tracking-tight text-foreground mb-0">
        Transform Your Business
      </h2>
    </div>
  );
};