import { Check } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Basic Info" },
  { number: 2, label: "Project Details" },
  { number: 3, label: "Timeline" }
];

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  return (
    <div className="relative pt-8 pb-4">
      <div className="flex justify-between items-center relative">
        <div className="absolute h-[2px] bg-border top-1/2 left-0 right-0 -translate-y-1/2 z-0" />
        {steps.map(({ number, label }) => (
          <div key={number} className="relative z-10 flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                currentStep >= number
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300 bg-background"
              }`}
            >
              {currentStep > number ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{number}</span>
              )}
            </div>
            <span className="mt-2 text-xs font-medium text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;