import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight } from "lucide-react";
import { FormData } from "./project-start/types";
import BasicInfoStep from "./project-start/BasicInfoStep";
import ProjectDetailsStep from "./project-start/ProjectDetailsStep";
import AIRequirementsStep from "./project-start/AIRequirementsStep";
import TimelineStep from "./project-start/TimelineStep";
import ProgressSteps from "./project-start/ProgressSteps";
import ConsultationScheduler from "./project-start/ConsultationScheduler";
import { supabase } from "@/integrations/supabase/client";

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
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("[ProjectStartModal] State updated:", { 
      step, 
      showCalendly, 
      isSubmitting,
      formData 
    });
  }, [step, showCalendly, isSubmitting, formData]);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const formatBudgetRange = (range: string | undefined) => {
    if (!range) return null;
    
    const matches = range.match(/\d+/g);
    if (!matches) return null;
    
    let min = parseInt(matches[0]);
    let max = matches.length > 1 ? parseInt(matches[1]) : min;
    
    if (range === "under-10000") {
      min = 0;
      max = 10000;
    } else if (range === "200000+") {
      min = 200000;
      max = 1000000;
    }
    
    return `[${min},${max}]`;
  };

  const handleSubmit = async () => {
    console.log("[handleSubmit] Starting submission process");
    try {
      setIsSubmitting(true);
      console.log("[handleSubmit] Form data to be submitted:", formData);

      const projectData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        project_type: formData.projectType,
        description: formData.description,
        timeline: formData.timeline,
        pain_points: formData.pain_points || [],
        complexity: formData.complexity,
        team_size: formData.teamSize ? parseInt(formData.teamSize) : null,
        budget_range: formatBudgetRange(formData.budgetRange),
        workforce_simulation_scope: formData.workforce_simulation_scope,
        ai_agent_requirements: formData.ai_agent_requirements || []
      };

      console.log("[handleSubmit] Formatted project data:", projectData);

      const { error } = await supabase
        .from('projects')
        .insert([projectData]);

      if (error) {
        console.error('[handleSubmit] Project submission error:', error);
        throw new Error(error.message);
      }

      console.log('[handleSubmit] Project saved successfully');
      
      toast({
        title: "Success!",
        description: "Your project details have been saved. Let's schedule a consultation!",
      });

      // Important: Set showCalendly to true AFTER successful submission
      setShowCalendly(true);
      console.log("[handleSubmit] showCalendly set to true");
      
    } catch (error) {
      console.error('[handleSubmit] Submission error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save project details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    console.log("[handleModalClose] Closing modal and resetting state");
    setShowCalendly(false);
    setStep(1);
    setFormData(initialFormData);
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
          <div className={!showCalendly ? "mt-16" : ""}>{renderStep()}</div>
          {!showCalendly && (
            <div className="flex justify-between mt-8 sticky bottom-0 bg-background py-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              {step === 4 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Submit Project"}
                </Button>
              ) : (
                <Button onClick={handleNext} className="group">
                  Next
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectStartModal;