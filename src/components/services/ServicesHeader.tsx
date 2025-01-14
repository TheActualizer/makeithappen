import { Sparkle } from "lucide-react";

export const ServicesHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-4">
        <Sparkle className="w-4 h-4 text-secondary" />
        <span className="text-sm font-medium text-muted-foreground">
          Enterprise-Grade AI Solutions
        </span>
      </div>
      
      <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
        Transform Your Business with AI-Powered Solutions
      </h2>
      
      <p className="text-muted-foreground max-w-2xl mx-auto">
        From website development to autonomous enterprise systems, we deliver cutting-edge solutions at unprecedented speed.
      </p>
    </div>
  );
};