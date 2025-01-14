import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  category: string;
  description: string;
  features: string[];
}

export const FeatureCard = ({ icon: Icon, category, description, features }: FeatureCardProps) => {
  return (
    <div className="group relative transform transition-all duration-300 hover:-translate-y-1">
      {/* Twitter-style card */}
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 dark:text-white font-semibold text-base mb-2">
              {category}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
              {description}
            </p>
            <ul className="space-y-2">
              {features.map((item, i) => (
                <li key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-1 h-1 rounded-full bg-primary/70 mr-2" />
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