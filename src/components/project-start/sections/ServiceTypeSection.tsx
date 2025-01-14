import { Button } from "@/components/ui/button";
import { BriefcaseIcon } from "lucide-react";
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
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        <BriefcaseIcon className="w-6 h-6 text-primary" />
        Services Required
      </h3>
      <div className="grid grid-cols-1 gap-2">
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