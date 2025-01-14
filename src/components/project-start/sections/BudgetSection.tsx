import { Button } from "@/components/ui/button";
import { DollarSign, Award } from "lucide-react";
import { FormData } from "../types";

interface BudgetSectionProps {
  formData: FormData;
  onBudgetChange: (value: string) => void;
}

const budgetRanges = [
  { value: "under-10000", label: "Under $10,000" },
  { value: "10000-25000", label: "$10,000 - $25,000" },
  { value: "25000-50000", label: "$25,000 - $50,000" },
  { value: "50000-100000", label: "$50,000 - $100,000" },
  { value: "100000-200000", label: "$100,000 - $200,000" },
  { value: "200000+", label: "$200,000+" }
];

export const BudgetSection = ({ formData, onBudgetChange }: BudgetSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-3 text-2xl font-bold relative group">
        <Award className="w-7 h-7 text-primary animate-pulse" />
        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
          Budget Range
        </span>
        <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {budgetRanges.map((range) => (
          <Button
            key={range.value}
            variant={formData.budgetRange === range.value ? "default" : "outline"}
            size="sm"
            onClick={() => onBudgetChange(range.value)}
            className="justify-start text-sm h-auto py-3 px-4 w-full"
          >
            {range.label}
          </Button>
        ))}
      </div>
    </div>
  );
};