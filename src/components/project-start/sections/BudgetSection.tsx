import { Slider } from "@/components/ui/slider";
import { Award } from "lucide-react";
import { FormData } from "../types";
import { useState, useEffect } from "react";

interface BudgetSectionProps {
  formData: FormData;
  onBudgetChange: (value: string) => void;
}

const formatBudget = (value: number): string => {
  if (value < 10) return "under-10000";
  if (value < 25) return "10000-25000";
  if (value < 50) return "25000-50000";
  if (value < 100) return "50000-100000";
  if (value < 200) return "100000-200000";
  return "200000+";
};

const formatBudgetDisplay = (value: number): string => {
  if (value < 10) return "< $10k";
  if (value < 25) return "$10k - $25k";
  if (value < 50) return "$25k - $50k";
  if (value < 100) return "$50k - $100k";
  if (value < 200) return "$100k - $200k";
  return "$200k+";
};

export const BudgetSection = ({ formData, onBudgetChange }: BudgetSectionProps) => {
  const [sliderValue, setSliderValue] = useState<number>(10);

  useEffect(() => {
    // Set initial slider value based on formData
    if (formData.budgetRange) {
      const value = formData.budgetRange;
      if (value === "under-10000") setSliderValue(5);
      else if (value === "10000-25000") setSliderValue(15);
      else if (value === "25000-50000") setSliderValue(35);
      else if (value === "50000-100000") setSliderValue(75);
      else if (value === "100000-200000") setSliderValue(150);
      else if (value === "200000+") setSliderValue(200);
    }
  }, [formData.budgetRange]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
    onBudgetChange(formatBudget(value[0]));
  };

  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-3 text-2xl font-bold relative group">
        <Award className="w-7 h-7 text-primary animate-pulse" />
        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
          Budget Range
        </span>
      </h3>
      <div className="space-y-6 px-2">
        <div className="text-center mb-8">
          <span className="text-2xl font-semibold text-primary">
            {formatBudgetDisplay(sliderValue)}
          </span>
        </div>
        <Slider
          defaultValue={[10]}
          max={200}
          step={1}
          value={[sliderValue]}
          onValueChange={handleSliderChange}
          className="w-full"
        />
      </div>
    </div>
  );
};