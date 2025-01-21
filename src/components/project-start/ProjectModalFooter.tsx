import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface ProjectModalFooterProps {
  step: number;
  showCalendly: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const ProjectModalFooter = ({
  step,
  showCalendly,
  isSubmitting,
  onBack,
  onNext,
  onSubmit
}: ProjectModalFooterProps) => {
  if (showCalendly) return null;

  return (
    <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-3 sticky bottom-0 mt-auto">
      <div className="flex justify-between gap-3">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={step === 1}
          size="sm"
        >
          Back
        </Button>
        {step === 3 ? (
          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? "Saving..." : "Submit"}
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            size="sm"
            className="group bg-primary hover:bg-primary/90"
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectModalFooter;