import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl sm:text-2xl">
            {showCalendly ? "Schedule a Consultation" : "Project Intake Form"}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {showCalendly 
              ? "Choose a time that works best for you."
              : "Help us understand your project requirements and objectives"}
          </DialogDescription>
        </DialogHeader>
        <div className="relative mt-4">
          {!showCalendly && <ProgressSteps currentStep={step} />}
          <div className={`${!showCalendly ? "mt-8 sm:mt-12" : ""} max-h-[calc(90vh-12rem)] overflow-y-auto`}>
            {renderStep()}
          </div>
          {!showCalendly && (
            <div className="flex items-center justify-between gap-2 mt-4 sm:mt-6 sticky bottom-0 bg-background/80 backdrop-blur-sm py-2 border-t">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1}
                className="h-8 px-3 text-sm"
              >
                Back
              </Button>
              {step === 3 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="h-8 px-3 text-sm font-medium bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? "Saving..." : "Submit"}
                </Button>
              ) : (
                <Button 
                  onClick={handleNext} 
                  className="h-8 px-3 text-sm font-medium group inline-flex items-center bg-primary hover:bg-primary/90"
                >
                  Next
                  <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
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