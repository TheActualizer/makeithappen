import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Building, Briefcase } from "lucide-react";
import { FormData } from "@/components/project-start/types";
import BasicInfoStep from "@/components/project-start/BasicInfoStep";
import ProjectDetailsStep from "@/components/project-start/ProjectDetailsStep";
import ConsultationScheduler from "@/components/project-start/ConsultationScheduler";
import ProgressSteps from "@/components/project-start/ProgressSteps";
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

  const handleNext = () => {
    if (step < 2) {
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
      default:
        return null;
    }
  };

  const renderStepIcon = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return <Building className="w-5 h-5 text-primary" />;
      case 2:
        return <Briefcase className="w-5 h-5 text-primary" />;
      default:
        return null;
    }
  };

  const getStepTitle = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return "Organization Details";
      case 2:
        return "Project Scope";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F7F7F7] via-white to-[#F7F7F7]">
      <Navbar />
      
      <div className="flex-1 container max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="space-y-6">
          {!showCalendly && (
            <div className="text-center space-y-3 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#001e00]">
                Start Your Project
              </h1>
              <p className="text-[#5e6d55] text-base max-w-xl mx-auto">
                Tell us about your project, and we'll help bring it to life with our expertise in AI and automation.
              </p>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-[#e4ebe4] overflow-hidden relative">
            {!showCalendly && (
              <div className="p-6 border-b border-[#e4ebe4] bg-[#f7faf7]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {renderStepIcon(step)}
                    <h2 className="text-lg font-semibold text-[#001e00]">{getStepTitle(step)}</h2>
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
          </div>
        </div>
      </div>

      {/* Fixed bottom navigation bar on mobile */}
      {!showCalendly && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden border-t border-[#e4ebe4] bg-white shadow-lg p-4 z-50">
          <div className="container max-w-4xl mx-auto">
            <div className="flex justify-between gap-3">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="w-28 border-[#e4ebe4] text-[#001e00] hover:bg-[#f7faf7]"
              >
                Back
              </Button>
              {step === 2 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-28 bg-[#108a00] hover:bg-[#14a800] text-white"
                >
                  {isSubmitting ? "Saving..." : "Submit"}
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  className="w-28 group bg-[#108a00] hover:bg-[#14a800] text-white"
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop navigation */}
      {!showCalendly && (
        <div className="hidden md:block border-t border-[#e4ebe4] bg-[#f7faf7] p-4">
          <div className="container max-w-4xl mx-auto">
            <div className="flex justify-between gap-3">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="w-28 border-[#e4ebe4] text-[#001e00] hover:bg-white"
              >
                Back
              </Button>
              {step === 2 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-28 bg-[#108a00] hover:bg-[#14a800] text-white"
                >
                  {isSubmitting ? "Saving..." : "Submit"}
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  className="w-28 group bg-[#108a00] hover:bg-[#14a800] text-white"
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartProject;