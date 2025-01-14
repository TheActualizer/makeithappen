import { Check } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  return (
    <div className="absolute top-0 w-full">
      <div className="flex justify-between items-center mb-6 sm:mb-8 relative">
        <div className="absolute h-[2px] bg-border top-1/2 left-0 right-0 -translate-y-1/2 z-0" />
        {[1, 2, 3].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              currentStep >= stepNumber
                ? "border-primary bg-primary text-white"
                : "border-gray-300 bg-background"
            }`}
          >
            {currentStep > stepNumber ? (
              <Check className="w-4 h-4" />
            ) : (
              <span className="text-sm">{stepNumber}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;