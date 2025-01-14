import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  category: string;
  description: string;
  features: string[];
}

export const FeatureCard = ({ icon: Icon, category, description, features }: FeatureCardProps) => {
  return (
    <div className="bg-white/5 hover:bg-white/10 p-4 rounded-lg border border-secondary/10 transition-all duration-300 group hover:shadow-lg hover:shadow-secondary/5">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
          <Icon className="w-5 h-5 text-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base mb-1">{category}</h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{description}</p>
          <ul className="space-y-1.5">
            {features.map((item, i) => (
              <li key={i} className="flex items-center text-sm text-gray-300">
                <span className="w-1 h-1 rounded-full bg-secondary mr-2 opacity-70" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};