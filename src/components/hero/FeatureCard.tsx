import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  category: string;
  description: string;
  features: string[];
}

export const FeatureCard = ({ icon: Icon, category, description, features }: FeatureCardProps) => {
  return (
    <div className="group relative overflow-hidden">
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/30 to-[#0EA5E9]/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-white/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-[#9b87f5]/20 to-[#0EA5E9]/20 group-hover:from-[#9b87f5]/30 group-hover:to-[#0EA5E9]/30 transition-colors">
            <Icon className="w-6 h-6 text-white/90" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white/90 font-semibold text-lg mb-2 group-hover:text-white transition-colors">{category}</h3>
            <p className="text-white/70 text-sm mb-4 line-clamp-2 group-hover:text-white/80 transition-colors">{description}</p>
            <ul className="space-y-2">
              {features.map((item, i) => (
                <li key={i} className="flex items-center text-sm text-white/60 group-hover:text-white/70 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#0EA5E9] mr-2" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};