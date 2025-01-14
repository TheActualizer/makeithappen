import { Check } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  const steps = [1, 2, 3];

  return (
    <div className="flex items-center space-x-1">
      {steps.map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`
              w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
              transition-all duration-200
              ${
                currentStep > step
                  ? "bg-primary text-primary-foreground"
                  : currentStep === step
                  ? "bg-primary/20 text-primary border border-primary"
                  : "bg-accent/20 text-muted-foreground"
              }
            `}
          >
            {currentStep > step ? (
              <Check className="w-3 h-3" />
            ) : (
              step
            )}
          </div>
          {step < steps.length && (
            <div
              className={`
                w-6 h-0.5 mx-0.5
                ${
                  currentStep > step
                    ? "bg-primary"
                    : "bg-accent/20"
                }
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;