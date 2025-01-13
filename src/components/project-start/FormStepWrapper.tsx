import { ReactNode } from "react";

interface FormStepWrapperProps {
  children: ReactNode;
  showNavigation?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  isLastStep?: boolean;
  isSubmitting?: boolean;
}

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const FormStepWrapper = ({
  children,
  showNavigation = true,
  onBack,
  onNext,
  onSubmit,
  isLastStep = false,
  isSubmitting = false,
}: FormStepWrapperProps) => {
  return (
    <div className="space-y-6">
      {children}
      
      {showNavigation && (
        <div className="flex justify-between mt-8 sticky bottom-0 bg-background py-4">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={!onBack}
          >
            Back
          </Button>
          
          {isLastStep ? (
            <Button
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Submit Project"}
            </Button>
          ) : (
            <Button onClick={onNext} className="group">
              Next
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};