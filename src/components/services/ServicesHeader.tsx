import { Sparkle } from "lucide-react";

export const ServicesHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent/30 backdrop-blur-sm border border-accent/10 mb-2">
        <Sparkle className="w-4 h-4 text-secondary animate-pulse" />
        <span className="text-sm text-gray-300">Efficient. Scalable. Future-Ready.</span>
      </div>
      
      <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
        Core Solutions
      </h2>
      <p className="text-gray-400 max-w-3xl mx-auto">
        Streamlined automation and development solutions that adapt 
        to your business needs and growth.
      </p>
    </div>
  );
};