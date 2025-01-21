import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FormData } from "../types";

export const useProjectSubmission = (
  setShowCalendly: (show: boolean) => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const cleanFormData = (data: FormData) => {
    const cleaned = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      project_type: data.projectType || [],
      description: data.description,
      timeline: data.timeline,
      pain_points: data.pain_points || [],
      complexity: data.complexity || null,
      team_size: data.teamSize ? parseInt(data.teamSize) : null,
      budget_range: formatBudgetRange(data.budgetRange),
      workforce_simulation_scope: data.workforce_simulation_scope || null,
      ai_agent_requirements: data.ai_agent_requirements || []
    };

    // Remove any undefined values
    Object.keys(cleaned).forEach(key => {
      if (cleaned[key] === undefined) {
        cleaned[key] = null;
      }
    });

    return cleaned;
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting form data:", formData);

      const projectData = cleanFormData(formData);
      console.log("Cleaned project data:", projectData);

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

  return {
    isSubmitting,
    handleSubmit
  };
};