import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  category: string;
  description: string;
  features: string[];
}

export const FeatureCard = ({ icon: Icon, category, description, features }: FeatureCardProps) => {
  return (
    <div className="bg-[#F6F6F7] hover:bg-[#F1F0FB] p-6 rounded-lg border border-[#E5E6E8] transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-lg bg-[#FEF7CD] group-hover:bg-[#FDE1D3] transition-colors">
          <Icon className="w-6 h-6 text-[#2A2F33]" />
        </div>
        <div className="flex-1">
          <h3 className="text-[#2A2F33] font-semibold text-lg mb-2">{category}</h3>
          <p className="text-[#454950] text-sm mb-4 leading-relaxed">{description}</p>
          <ul className="space-y-2.5">
            {features.map((item, i) => (
              <li key={i} className="flex items-center text-sm text-[#454950]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0071DC] mr-2 opacity-70" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};