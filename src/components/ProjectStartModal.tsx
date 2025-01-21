import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormData } from "./project-start/types";
import ProgressSteps from "./project-start/ProgressSteps";
import ProjectModalContent from "./project-start/ProjectModalContent";
import ProjectModalFooter from "./project-start/ProjectModalFooter";
import { useProjectSubmission } from "./project-start/hooks/useProjectSubmission";

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: null,
  company: null,
  projectType: [],
  description: "",
  timeline: "asap",
  pain_points: [],
  ai_agent_requirements: []
};

const ProjectStartModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showCalendly, setShowCalendly] = useState(false);
  const navigate = useNavigate();
  const { isSubmitting, handleSubmit } = useProjectSubmission(setShowCalendly);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleModalClose = () => {
    setShowCalendly(false);
    setStep(1);
    setFormData(initialFormData);
    onClose();
    navigate("/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="max-w-[600px] h-[85vh] flex flex-col bg-background/95 backdrop-blur-md">
        <DialogHeader className="px-4 py-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-medium">
              {showCalendly ? "Schedule Consultation" : "New Project"}
            </DialogTitle>
            {!showCalendly && <ProgressSteps currentStep={step} />}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            <ProjectModalContent
              step={step}
              showCalendly={showCalendly}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>

        <ProjectModalFooter
          step={step}
          showCalendly={showCalendly}
          isSubmitting={isSubmitting}
          onBack={handleBack}
          onNext={handleNext}
          onSubmit={() => handleSubmit(formData)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectStartModal;