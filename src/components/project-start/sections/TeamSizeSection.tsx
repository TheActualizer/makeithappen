import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { FormData } from "../types";

interface TeamSizeSectionProps {
  formData: FormData;
  onTeamSizeChange: (value: string) => void;
}

const teamSizes = [
  { value: "1-5", label: "1-5 members" },
  { value: "6-10", label: "6-10 members" },
  { value: "11-20", label: "11-20 members" },
  { value: "20+", label: "20+ members" }
];

export const TeamSizeSection = ({ formData, onTeamSizeChange }: TeamSizeSectionProps) => {
  return (
    <div className="space-y-4">
      <label className="text-sm font-medium flex items-center gap-2">
        <Users className="w-4 h-4" />
        Team Size
      </label>
      <div className="grid grid-cols-1 gap-2">
        {teamSizes.map((size) => (
          <Button
            key={size.value}
            variant={formData.teamSize === size.value ? "default" : "outline"}
            size="sm"
            onClick={() => onTeamSizeChange(size.value)}
            className="justify-start text-sm h-auto py-3 px-4 w-full"
          >
            {size.label}
          </Button>
        ))}
      </div>
    </div>
  );
};