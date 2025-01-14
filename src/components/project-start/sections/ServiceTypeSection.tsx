import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
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
  const selectedCount = formData.projectType?.length || 0;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Select Service Types</h3>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between"
          >
            {selectedCount === 0 ? (
              "Select services..."
            ) : (
              `${selectedCount} service${selectedCount === 1 ? '' : 's'} selected`
            )}
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-[300px] max-h-[300px] overflow-y-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          align="start"
        >
          {serviceTypes.map((type) => (
            <DropdownMenuCheckboxItem
              key={type.value}
              checked={formData.projectType?.includes(type.value)}
              onCheckedChange={() => onServiceTypeChange(type.value)}
              className="flex items-center gap-2"
            >
              <span className="text-lg">{type.icon}</span>
              {type.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {selectedCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.projectType?.map((selected) => {
            const service = serviceTypes.find(t => t.value === selected);
            return (
              <div
                key={selected}
                className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary rounded-full px-2 py-1"
              >
                <span>{service?.icon}</span>
                <span>{service?.label}</span>
                <button
                  onClick={() => onServiceTypeChange(selected)}
                  className="ml-1 hover:text-primary/80"
                >
                  ×
                </button>
              </div>
            )}
          )}
        </div>
      )}
    </div>
  );
};