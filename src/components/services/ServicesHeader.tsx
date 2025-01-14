import { Sparkle } from "lucide-react";

const ServicesHeader = () => {
  return (
    <div className="text-center space-y-4 mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-4">
        <Sparkle className="w-4 h-4 text-secondary animate-pulse" />
        <span className="text-sm font-medium text-muted-foreground">
          Revolutionize Your Business with AI
        </span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
        Intelligent Solutions for Modern Enterprises
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Transform your business with our comprehensive suite of AI-powered solutions. 
        From enterprise-wide digital transformation to autonomous AI workforces and 
        industry-specific implementations, we deliver results at unprecedented speed.
      </p>
    </div>
  );
};

export default ServicesHeader;