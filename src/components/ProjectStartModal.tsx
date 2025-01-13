import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { FormStepWrapper } from "./project-start/FormStepWrapper";
import { useProjectForm } from "./project-start/useProjectForm";
import BasicInfoStep from "./project-start/BasicInfoStep";
import ProjectDetailsStep from "./project-start/ProjectDetailsStep";
import AIRequirementsStep from "./project-start/AIRequirementsStep";
import TimelineStep from "./project-start/TimelineStep";
import ProgressSteps from "./project-start/ProgressSteps";
import ConsultationScheduler from "./project-start/ConsultationScheduler";

const ProjectStartModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const {
    step,
    formData,
    setFormData,
    isSubmitting,
    showCalendly,
    handleNext,
    handleBack,
    handleSubmit,
    resetForm
  } = useProjectForm();

  const handleModalClose = () => {
    console.log("[handleModalClose] Closing modal and resetting state");
    resetForm();
    onClose();
    navigate("/");
  };

  const renderStep = () => {
    console.log("[renderStep] Rendering step with showCalendly:", showCalendly);
    
    if (showCalendly) {
      console.log("[renderStep] Attempting to render ConsultationScheduler");
      return <ConsultationScheduler formData={formData} />;
    }

    switch (step) {
      case 1:
        return <BasicInfoStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <ProjectDetailsStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <AIRequirementsStep formData={formData} setFormData={setFormData} />;
      case 4:
        return <TimelineStep formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {showCalendly ? "Schedule a Consultation" : "Project Intake Form"}
          </DialogTitle>
          <DialogDescription>
            {showCalendly 
              ? "Choose a time that works best for you."
              : "Help us understand your project requirements and objectives"}
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          {!showCalendly && <ProgressSteps currentStep={step} />}
          <div className={!showCalendly ? "mt-16" : ""}>
            <FormStepWrapper
              showNavigation={!showCalendly}
              onBack={step > 1 ? handleBack : undefined}
              onNext={step < 4 ? handleNext : undefined}
              onSubmit={step === 4 ? handleSubmit : undefined}
              isLastStep={step === 4}
              isSubmitting={isSubmitting}
            >
              {renderStep()}
            </FormStepWrapper>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectStartModal;