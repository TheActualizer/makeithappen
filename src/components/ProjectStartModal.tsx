import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, ChevronRight } from "lucide-react";
import { FormData } from "./project-start/types";
import BasicInfoStep from "./project-start/BasicInfoStep";
import ProjectDetailsStep from "./project-start/ProjectDetailsStep";
import TimelineStep from "./project-start/TimelineStep";
import ScheduleStep from "./project-start/ScheduleStep";
import { supabase } from "@/integrations/supabase/client";

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "other",
  description: "",
  timeline: "asap",
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
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email)) {
      toast({
        title: "Required Fields",
        description: "Please fill in your name and email",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2 && !formData.description) {
      toast({
        title: "Required Fields",
        description: "Please provide a project description",
        variant: "destructive",
      });
      return;
    }

    if (step === 4 && (!formData.consultationDate || !formData.consultationTime)) {
      toast({
        title: "Required Fields",
        description: "Please select a consultation date and time",
        variant: "destructive",
      });
      return;
    }

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log("Submitting form data:", formData);

      // Send consultation email
      const { error: emailError } = await supabase.functions.invoke('send-consultation-email', {
        body: {
          name: formData.name,
          email: formData.email,
          consultationDate: formData.consultationDate?.toISOString().split('T')[0],
          consultationTime: formData.consultationTime,
          projectType: formData.projectType,
          description: formData.description,
        },
      });

      if (emailError) {
        throw new Error('Failed to schedule consultation');
      }

      toast({
        title: "Success!",
        description: `Your consultation has been scheduled for ${formData.consultationDate?.toLocaleDateString()} at ${formData.consultationTime}. Check your email for confirmation.`,
      });
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to schedule consultation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfoStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <ProjectDetailsStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <TimelineStep formData={formData} setFormData={setFormData} />;
      case 4:
        return <ScheduleStep formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Start Your Project</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <div className="absolute top-0 w-full">
            <div className="flex justify-between mb-8">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step >= stepNumber
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300"
                  }`}
                >
                  {step > stepNumber ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16">{renderStep()}</div>
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              onClick={step === 4 ? handleSubmit : handleNext}
              className="group"
              disabled={isSubmitting}
            >
              {step === 4 ? (
                isSubmitting ? "Scheduling..." : "Schedule Consultation"
              ) : (
                <>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectStartModal;