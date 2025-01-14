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
  { value: "website", label: "Web", icon: "🌐" },
  { value: "crm", label: "CRM", icon: "👥" },
  { value: "accounting", label: "Finance", icon: "💰" },
  { value: "marketing", label: "Marketing", icon: "📈" },
  { value: "digital-workforce", label: "AI", icon: "🤖" },
  { value: "legal", label: "Legal", icon: "⚖️" },
  { value: "hr", label: "HR", icon: "👤" },
  { value: "other", label: "More", icon: "✨" }
];

export const ServiceTypeSection = ({ formData, onServiceTypeChange }: ServiceTypeSectionProps) => {
  const selectedCount = formData.projectType?.length || 0;

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-medium opacity-70">🎯 Services</h3>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between h-9 px-3"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">🔍</span>
              {selectedCount === 0 ? (
                "Select"
              ) : (
                `${selectedCount} ${selectedCount === 1 ? 'service' : 'services'}`
              )}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-[200px] max-h-[300px] overflow-y-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          align="start"
        >
          {serviceTypes.map((type) => (
            <DropdownMenuCheckboxItem
              key={type.value}
              checked={formData.projectType?.includes(type.value)}
              onCheckedChange={() => onServiceTypeChange(type.value)}
              className="flex items-center gap-2 py-1.5 px-2"
            >
              <span className="text-xl transform hover:scale-110 transition-transform">{type.icon}</span>
              <span className="text-sm">{type.label}</span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {selectedCount > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {formData.projectType?.map((selected) => {
            const service = serviceTypes.find(t => t.value === selected);
            return service && (
              <div
                key={selected}
                className="inline-flex items-center gap-1.5 text-xs bg-primary/5 text-primary rounded-lg px-2 py-1 hover:bg-primary/10 transition-colors"
              >
                <span className="text-base">{service.icon}</span>
                <button
                  onClick={() => onServiceTypeChange(selected)}
                  className="hover:text-primary/80"
                  aria-label={`Remove ${service.label}`}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};