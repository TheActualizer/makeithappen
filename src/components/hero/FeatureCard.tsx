import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  category: string;
  description: string;
  features: string[];
}

export const FeatureCard = ({ icon: Icon, category, description, features }: FeatureCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-[#E9EBED] hover:border-[#FF9900] transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-[#F1F3F3] group-hover:bg-[#FFF7E5] transition-colors">
          <Icon className="w-6 h-6 text-[#232F3E] group-hover:text-[#FF9900]" />
        </div>
        <div>
          <h3 className="text-[#232F3E] font-semibold mb-2">{category}</h3>
          <p className="text-sm text-[#545B64] mb-4">{description}</p>
          <ul className="space-y-2">
            {features.map((item, i) => (
              <li key={i} className="flex items-center text-sm text-[#545B64]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900] mr-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};