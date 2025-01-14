import { Check } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Info" },
  { number: 2, label: "Details" },
  { number: 3, label: "Review" }
];

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  return (
    <div className="flex items-center gap-2">
      {steps.map(({ number, label }) => (
        <div key={number} className="flex items-center">
          <div
            className={`flex items-center justify-center w-5 h-5 text-xs rounded-full transition-all duration-300 ${
              currentStep >= number
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {currentStep > number ? (
              <Check className="w-3 h-3" />
            ) : (
              <span>{number}</span>
            )}
          </div>
          <span className="text-xs text-muted-foreground ml-1 mr-2">
            {label}
          </span>
          {number < steps.length && (
            <span className="text-muted-foreground/30">•</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;