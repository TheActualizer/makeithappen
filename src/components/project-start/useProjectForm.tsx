import { useState } from "react";
import { FormData } from "./types";
import { useToast } from "@/hooks/use-toast";
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

export const useProjectForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const { toast } = useToast();

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

  const handleSubmit = async () => {
    console.log("[handleSubmit] Starting submission process");
    if (isSubmitting) {
      console.log("[handleSubmit] Already submitting, skipping");
      return;
    }

    setIsSubmitting(true);
    try {
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
        ai_agent_requirements: formData.ai_agent_requirements || [],
        workforce_simulation_scope: formData.workforce_simulation_scope || null,
        team_size: formData.teamSize ? parseInt(formData.teamSize) : null,
        budget_range: formData.budgetRange || null
      };

      console.log("[handleSubmit] Mapped project data:", projectData);

      const { error } = await supabase
        .from('projects')
        .insert([projectData]);

      if (error) {
        console.error('[handleSubmit] Project submission error:', error);
        throw error;
      }

      console.log('[handleSubmit] Project saved successfully');
      
      toast({
        title: "Success!",
        description: "Your project details have been saved. Let's schedule a consultation!",
      });

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

  const resetForm = () => {
    setShowCalendly(false);
    setStep(1);
    setFormData(initialFormData);
  };

  return {
    step,
    formData,
    setFormData,
    isSubmitting,
    showCalendly,
    handleNext,
    handleBack,
    handleSubmit,
    resetForm
  };
};