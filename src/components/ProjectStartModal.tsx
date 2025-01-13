import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, ChevronRight, Calendar } from "lucide-react";
import { FormData } from "./project-start/types";
import BasicInfoStep from "./project-start/BasicInfoStep";
import ProjectDetailsStep from "./project-start/ProjectDetailsStep";
import TimelineStep from "./project-start/TimelineStep";
import CalendlyEmbed from "./CalendlyEmbed";
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

      const { data, error } = await supabase
        .from('projects')
        .insert(projectData)
        .select('id')
        .single();

      if (error) {
        console.error('Project submission error:', error);
        throw new Error(error.message);
      }

      console.log('Project saved successfully:', data);

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
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Schedule Your Consultation</h3>
          <p className="text-sm text-muted-foreground">
            Thank you for submitting your project details. Let's schedule a time to discuss your requirements in detail.
          </p>
          <div className="h-[600px]">
            <CalendlyEmbed 
              url="https://calendly.com/belchonen18/30min" 
              prefill={{
                name: formData.name,
                email: formData.email,
                customAnswers: {
                  a1: formData.company || 'Not provided',
                  a2: formData.phone || 'Not provided'
                }
              }}
            />
          </div>
        </div>
      );
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
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {showCalendly ? "Schedule a Consultation" : "Project Intake Form"}
          </DialogTitle>
          <DialogDescription>
            {showCalendly 
              ? "Choose a time that works best for you to discuss your project in detail."
              : "Help us understand your project requirements and objectives"}
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          {!showCalendly && (
            <div className="absolute top-0 w-full">
              <div className="flex justify-between mb-8">
                {[1, 2, 3].map((stepNumber) => (
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
          )}
          <div className={!showCalendly ? "mt-16" : ""}>{renderStep()}</div>
          {!showCalendly && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              {step === 3 ? (
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