import { Button } from "@/components/ui/button";
import { BriefcaseIcon, Star } from "lucide-react";
import { FormData } from "../types";

interface ServiceTypeSectionProps {
  formData: FormData;
  onServiceTypeChange: (serviceValue: string) => void;
}

const serviceTypes = [
  { value: "website", label: "Website & Digital Presence", icon: "🌐" },
  { value: "crm", label: "Customer Relationship Management", icon: "👥" },
  { value: "accounting", label: "Financial & Accounting Systems", icon: "💰" },
  { value: "marketing", label: "Marketing & Automation", icon: "📈" },
  { value: "digital-workforce", label: "Digital Workforce & AI", icon: "🤖" },
  { value: "legal", label: "Legal Operations", icon: "⚖️" },
  { value: "hr", label: "Human Resources", icon: "👤" },
  { value: "other", label: "Other Services", icon: "✨" }
];

export const ServiceTypeSection = ({ formData, onServiceTypeChange }: ServiceTypeSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-3 text-2xl font-bold relative group">
        <Star className="w-7 h-7 text-secondary animate-pulse" />
        <span className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent animate-gradient">
          Services Required
        </span>
        <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-secondary/50 via-primary/50 to-secondary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {serviceTypes.map((type) => (
          <Button
            key={type.value}
            variant={formData.projectType?.includes(type.value) ? "default" : "outline"}
            size="lg"
            onClick={() => onServiceTypeChange(type.value)}
            className={`justify-start text-base h-auto py-4 px-4 w-full transition-all duration-200 ${
              formData.projectType?.includes(type.value)
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "hover:bg-accent/5"
            }`}
          >
            <span className="mr-2 text-xl">{type.icon}</span>
            {type.label}
          </Button>
        ))}
      </div>
    </div>
  );
};