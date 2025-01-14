import { Sparkle } from "lucide-react";

const ServicesHeader = () => {
  return (
    <div className="text-center space-y-4 mb-12 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float [animation-delay:1s]" />
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-4 animate-fade-in">
        <Sparkle className="w-4 h-4 text-secondary animate-pulse" />
        <span className="text-sm font-medium text-muted-foreground">
          Advanced AI Solutions
        </span>
      </div>

      {/* Title with gradient and animation */}
      <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient">
        Transform Your Business with AI-Powered Innovation
      </h1>

      {/* Description with animated images */}
      <div className="relative max-w-2xl mx-auto">
        <p className="text-muted-foreground animate-fade-in [animation-delay:0.2s]">
          From custom digital solutions to autonomous enterprise systems, we deliver cutting-edge 
          AI technology that revolutionizes how your business operates.
        </p>
        
        {/* Floating images */}
        <div className="absolute -left-16 -top-8 w-24 h-24 rounded-lg overflow-hidden rotate-[-12deg] animate-float opacity-80 hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1487887235947-a955ef187fcc" 
            alt="AI Innovation" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -right-16 -bottom-8 w-24 h-24 rounded-lg overflow-hidden rotate-[12deg] animate-float [animation-delay:0.5s] opacity-80 hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1498936178812-4b2e558d2937" 
            alt="Digital Transformation" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesHeader;