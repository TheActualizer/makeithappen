import { Button } from "@/components/ui/button";
import { Users, Heading } from "lucide-react";
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
    <div className="space-y-6">
      <h3 className="flex items-center gap-3 text-2xl font-bold relative group">
        <Heading className="w-7 h-7 text-secondary animate-pulse" />
        <span className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent animate-gradient">
          Team Size
        </span>
        <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-secondary/50 via-primary/50 to-secondary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </h3>
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