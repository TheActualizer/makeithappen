import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Briefcase, Building, Users, DollarSign, Calendar } from "lucide-react";
import { FormData } from "@/components/project-start/types";
import BasicInfoStep from "@/components/project-start/BasicInfoStep";
import ProjectDetailsStep from "@/components/project-start/ProjectDetailsStep";
import TimelineStep from "@/components/project-start/TimelineStep";
import ProgressSteps from "@/components/project-start/ProgressSteps";
import ConsultationScheduler from "@/components/project-start/ConsultationScheduler";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

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

const StartProject = () => {
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

  const renderStepIcon = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return <Building className="w-6 h-6 text-primary" />;
      case 2:
        return <Briefcase className="w-6 h-6 text-primary" />;
      case 3:
        return <Calendar className="w-6 h-6 text-primary" />;
      default:
        return null;
    }
  };

  const getStepTitle = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return "Tell us about your organization";
      case 2:
        return "Project requirements";
      case 3:
        return "Timeline and next steps";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              {showCalendly ? "Schedule Your Consultation" : "Start Your Project"}
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {showCalendly 
                ? "Choose a time that works best for you to discuss your project in detail."
                : "Tell us about your project, and we'll help you bring it to life with our expertise in AI and automation."}
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-lg border border-accent/20">
            {!showCalendly && (
              <div className="p-6 border-b border-accent/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {renderStepIcon(step)}
                    <h2 className="text-xl font-semibold">{getStepTitle(step)}</h2>
                  </div>
                  <ProgressSteps currentStep={step} />
                </div>
              </div>
            )}

            <div className="p-6">
              <div className="space-y-6">
                {renderStep()}
              </div>
            </div>

            {!showCalendly && (
              <div className="border-t border-accent/20 p-6">
                <div className="flex justify-between gap-3">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={step === 1}
                    className="w-32"
                  >
                    Back
                  </Button>
                  {step === 3 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-32 bg-primary hover:bg-primary/90"
                    >
                      {isSubmitting ? "Saving..." : "Submit"}
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNext}
                      className="w-32 group bg-primary hover:bg-primary/90"
                    >
                      Next
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartProject;