import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { FormData } from "../types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ServiceTypeSectionProps {
  formData: FormData;
  onServiceTypeChange: (serviceValue: string) => void;
}

const serviceTypes = [
  { 
    value: "website", 
    label: "Web Development", 
    icon: "🌐",
    description: "Custom websites & web applications"
  },
  { 
    value: "crm", 
    label: "CRM Solutions", 
    icon: "👥",
    description: "Customer relationship management"
  },
  { 
    value: "accounting", 
    label: "Financial Systems", 
    icon: "💰",
    description: "Accounting & financial automation"
  },
  { 
    value: "marketing", 
    label: "Marketing Tools", 
    icon: "📈",
    description: "Digital marketing automation"
  },
  { 
    value: "digital-workforce", 
    label: "AI Solutions", 
    icon: "🤖",
    description: "Intelligent automation & AI integration"
  },
  { 
    value: "legal", 
    label: "Legal Tech", 
    icon: "⚖️",
    description: "Legal process automation"
  },
  { 
    value: "hr", 
    label: "HR Systems", 
    icon: "👤",
    description: "Human resources management"
  },
  { 
    value: "other", 
    label: "Custom Solutions", 
    icon: "✨",
    description: "Other specialized requirements"
  }
];

export const ServiceTypeSection = ({ formData, onServiceTypeChange }: ServiceTypeSectionProps) => {
  const selectedCount = formData.projectType?.length || 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium text-muted-foreground">What type of services do you need?</h3>
        <p className="text-xs text-muted-foreground">Select all that apply</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {serviceTypes.map((type) => (
          <div
            key={type.value}
            onClick={() => onServiceTypeChange(type.value)}
            className={`
              group relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
              hover:border-primary/50 hover:bg-primary/5
              ${formData.projectType?.includes(type.value) 
                ? 'border-primary bg-primary/10' 
                : 'border-accent/20 bg-background'}
            `}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl transform group-hover:scale-110 transition-transform">
                {type.icon}
              </span>
              <div className="space-y-1">
                <h4 className="font-medium text-sm">{type.label}</h4>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </div>
            </div>
            {formData.projectType?.includes(type.value) && (
              <div className="absolute top-2 right-2">
                <span className="text-primary text-sm">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedCount > 0 && (
        <div className="mt-4 p-3 bg-accent/10 rounded-lg">
          <p className="text-xs text-muted-foreground mb-2">Selected services:</p>
          <div className="flex flex-wrap gap-2">
            {formData.projectType?.map((selected) => {
              const service = serviceTypes.find(t => t.value === selected);
              return service && (
                <div
                  key={selected}
                  className="inline-flex items-center gap-1.5 text-xs bg-background rounded-lg px-2 py-1.5 border border-accent/20"
                >
                  <span className="text-base">{service.icon}</span>
                  <span className="text-xs">{service.label}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onServiceTypeChange(selected);
                    }}
                    className="ml-1 hover:text-destructive"
                    aria-label={`Remove ${service.label}`}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};