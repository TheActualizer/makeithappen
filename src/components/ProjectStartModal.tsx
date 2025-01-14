import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight } from "lucide-react";
import { FormData } from "./project-start/types";
import BasicInfoStep from "./project-start/BasicInfoStep";
import ProjectDetailsStep from "./project-start/ProjectDetailsStep";
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
    try {
      setIsSubmitting(true);
      console.log("Submitting form data:", formData);

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

      console.log("Formatted project data:", projectData);

      const { error } = await supabase
        .from('projects')
        .insert(projectData);

      if (error) {
        console.error('Project submission error:', error);
        throw new Error(error.message);
      }

      console.log('Project saved successfully');

      toast({
        title: "Success!",
        description: "Your project details have been saved. Let's schedule a consultation!",
      });
      
      setShowCalendly(true);
      
    } catch (error) {
      console.error('Submission error:', error);
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
    setShowCalendly(false);
    setStep(1);
    setFormData(initialFormData);
    onClose();
    navigate("/");
  };

  const renderStep = () => {
    if (showCalendly) {
      return <ConsultationScheduler formData={formData} />;
    }

    switch (step) {
      case 1:
        return <BasicInfoStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <ProjectDetailsStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <TimelineStep formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="max-w-[600px] h-[85vh] flex flex-col bg-background/95 backdrop-blur-md">
        <DialogHeader className="px-4 py-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <DialogTitle className="text-xl font-semibold">
            {showCalendly ? "Schedule Consultation" : `Step ${step} of 3`}
          </DialogTitle>
          {!showCalendly && (
            <div className="mt-2">
              <ProgressSteps currentStep={step} />
            </div>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4">
          <div className="py-4 space-y-6">
            {renderStep()}
          </div>
        </div>

        {!showCalendly && (
          <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 sticky bottom-0 mt-auto">
            <div className="flex justify-between gap-3">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1}
                size="sm"
              >
                Back
              </Button>
              {step === 3 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? "Saving..." : "Submit"}
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  size="sm"
                  className="group bg-primary hover:bg-primary/90"
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectStartModal;
