import { Sparkle } from "lucide-react";

const ServicesHeader = () => {
  return (
    <div className="text-center space-y-4 mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-4">
        <Sparkle className="w-4 h-4 text-secondary animate-pulse" />
        <span className="text-sm font-medium text-muted-foreground">
          20x Faster Development with AI-Powered Solutions
        </span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
        Transform Your Business with Next-Generation AI
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        From website development to autonomous enterprise systems, we deliver cutting-edge solutions at unprecedented speed. 
        Our AI-powered approach ensures rapid deployment and exceptional results.
      </p>
    </div>
  );
};

export default ServicesHeader;