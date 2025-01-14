import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  category: string;
  description: string;
  features: string[];
}

export const FeatureCard = ({ icon: Icon, category, description, features }: FeatureCardProps) => {
  return (
    <div className="bg-white hover:bg-[#F1F0FB] p-6 rounded-xl border border-[#D6BCFA]/30 transition-all duration-300 group hover:shadow-lg hover:shadow-[#D6BCFA]/10 hover:translate-y-[-2px]">
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-lg bg-[#F1F0FB] group-hover:bg-white transition-colors">
          <Icon className="w-6 h-6 text-[#0071DC]" />
        </div>
        <div className="flex-1">
          <h3 className="text-[#1A1F2C] font-semibold text-lg mb-2">{category}</h3>
          <p className="text-[#8E9196] text-sm mb-4 leading-relaxed">{description}</p>
          <ul className="space-y-2.5">
            {features.map((item, i) => (
              <li key={i} className="flex items-center text-sm text-[#8E9196]">
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