import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  category: string;
  description: string;
  features: string[];
}

export const FeatureCard = ({ icon: Icon, category, description, features }: FeatureCardProps) => {
  return (
    <div className="group relative">
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur" />
      
      <div className="relative bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-lg p-4 rounded-lg border border-white/10 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/5 group-hover:-translate-y-1">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-colors">
            <Icon className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white/90 font-semibold text-base mb-1 group-hover:text-white transition-colors">{category}</h3>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2 group-hover:text-gray-300 transition-colors">{description}</p>
            <ul className="space-y-1.5">
              {features.map((item, i) => (
                <li key={i} className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  <span className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 mr-2 opacity-70" />
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