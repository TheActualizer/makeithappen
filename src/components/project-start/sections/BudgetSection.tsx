import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
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
    <div className="space-y-4">
      <label className="text-sm font-medium flex items-center gap-2">
        <DollarSign className="w-4 h-4" />
        Budget Range
      </label>
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