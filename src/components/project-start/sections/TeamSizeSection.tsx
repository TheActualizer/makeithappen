import { Slider } from "@/components/ui/slider";
import { Users } from "lucide-react";
import { FormData } from "../types";
import { useState, useEffect } from "react";

interface TeamSizeSectionProps {
  formData: FormData;
  onTeamSizeChange: (value: string) => void;
}

const formatTeamSize = (value: number): string => {
  if (value <= 5) return "1-5";
  if (value <= 10) return "6-10";
  if (value <= 20) return "11-20";
  return "20+";
};

const formatTeamSizeDisplay = (value: number): string => {
  if (value <= 5) return "Small Team (1-5)";
  if (value <= 10) return "Medium Team (6-10)";
  if (value <= 20) return "Large Team (11-20)";
  return "Enterprise (20+)";
};

export const TeamSizeSection = ({ formData, onTeamSizeChange }: TeamSizeSectionProps) => {
  const [sliderValue, setSliderValue] = useState<number>(5);

  useEffect(() => {
    // Set initial slider value based on formData
    if (formData.teamSize) {
      const value = formData.teamSize;
      if (value === "1-5") setSliderValue(3);
      else if (value === "6-10") setSliderValue(8);
      else if (value === "11-20") setSliderValue(15);
      else if (value === "20+") setSliderValue(25);
    }
  }, [formData.teamSize]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
    onTeamSizeChange(formatTeamSize(value[0]));
  };

  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-3 text-2xl font-bold relative group">
        <Users className="w-7 h-7 text-secondary animate-pulse" />
        <span className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent animate-gradient">
          Team Size
        </span>
      </h3>
      <div className="space-y-6 px-2">
        <div className="text-center mb-8">
          <span className="text-2xl font-semibold text-secondary">
            {formatTeamSizeDisplay(sliderValue)}
          </span>
        </div>
        <Slider
          defaultValue={[5]}
          max={30}
          step={1}
          value={[sliderValue]}
          onValueChange={handleSliderChange}
          className="w-full"
        />
      </div>
    </div>
  );
};