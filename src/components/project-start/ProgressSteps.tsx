import { Check } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  return (
    <div className="absolute top-0 w-full">
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              currentStep >= stepNumber
                ? "border-primary bg-primary text-white"
                : "border-gray-300"
            }`}
          >
            {currentStep > stepNumber ? (
              <Check className="w-4 h-4" />
            ) : (
              <span>{stepNumber}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;