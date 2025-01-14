import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  category: string;
  description: string;
  features: string[];
}

export const FeatureCard = ({ icon: Icon, category, description, features }: FeatureCardProps) => {
  return (
    <div className="group relative transform transition-all duration-300 hover:-translate-y-1 hover:translate-x-1">
      {/* Isometric gradient border effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#9b87f5]/20 via-[#33C3F0]/20 to-[#D6BCFA]/20 blur transform skew-x-2" />
      
      <div className="relative bg-[#1A1F2C]/40 hover:bg-[#1A1F2C]/60 backdrop-blur-lg p-6 rounded-lg border border-white/10 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#9b87f5]/5">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-gradient-to-r from-[#9b87f5]/10 to-[#33C3F0]/10 group-hover:from-[#9b87f5]/20 group-hover:to-[#33C3F0]/20 transition-colors transform skew-x-2">
            <Icon className="w-5 h-5 text-[#33C3F0] group-hover:text-[#D6BCFA] transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[#D6BCFA] font-semibold text-base mb-2 group-hover:text-white transition-colors">
              {category}
            </h3>
            <p className="text-[#8E9196] text-sm mb-4 line-clamp-2 group-hover:text-[#aaadb0] transition-colors">
              {description}
            </p>
            <ul className="space-y-2">
              {features.map((item, i) => (
                <li key={i} className="flex items-center text-sm text-[#8E9196] group-hover:text-[#aaadb0] transition-colors">
                  <span className="w-1 h-1 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#33C3F0] mr-2 opacity-70 transform skew-x-2" />
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