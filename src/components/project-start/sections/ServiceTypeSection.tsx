import { Button } from "@/components/ui/button";
import { BriefcaseIcon } from "lucide-react";
import { FormData } from "../types";

interface ServiceTypeSectionProps {
  formData: FormData;
  onServiceTypeChange: (serviceValue: string) => void;
}

const serviceTypes = [
  { value: "website", label: "Website & Digital Presence" },
  { value: "crm", label: "Customer Relationship Management" },
  { value: "accounting", label: "Financial & Accounting Systems" },
  { value: "marketing", label: "Marketing & Automation" },
  { value: "digital-workforce", label: "Digital Workforce & AI" },
  { value: "legal", label: "Legal Operations" },
  { value: "hr", label: "Human Resources" },
  { value: "other", label: "Other Services" }
];

export const ServiceTypeSection = ({ formData, onServiceTypeChange }: ServiceTypeSectionProps) => {
  return (
    <div className="space-y-4">
      <label className="text-sm font-medium flex items-center gap-2">
        <BriefcaseIcon className="w-4 h-4" />
        Services Required
      </label>
      <div className="grid grid-cols-1 gap-2">
        {serviceTypes.map((type) => (
          <Button
            key={type.value}
            variant={formData.projectType?.includes(type.value) ? "default" : "outline"}
            size="sm"
            onClick={() => onServiceTypeChange(type.value)}
            className="justify-start text-sm h-auto py-3 px-4 w-full"
          >
            {type.label}
          </Button>
        ))}
      </div>
    </div>
  );
};