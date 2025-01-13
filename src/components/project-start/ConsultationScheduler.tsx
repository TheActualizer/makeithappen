import CalendlyEmbed from "../CalendlyEmbed";
import { FormData } from "./types";
import { useEffect } from "react";

interface ConsultationSchedulerProps {
  formData: FormData;
}

const ConsultationScheduler = ({ formData }: ConsultationSchedulerProps) => {
  useEffect(() => {
    console.log("[ConsultationScheduler] Component mounted with formData:", formData);
  }, [formData]);

  const formatArrayOrDefault = (arr?: string[] | null, defaultText: string = 'None specified') => 
    arr && arr.length > 0 ? arr.join(', ') : defaultText;

  const getBudgetRangeText = (range?: string) => {
    if (!range) return 'Not specified';
    const matches = range.match(/\d+/g);
    if (!matches) return range;
    return range === "under-10000" ? "Under $10,000" :
           range === "200000+" ? "$200,000+" :
           `$${matches[0]},000 - $${matches[1]},000`;
  };

  const meetingPrep = `Project Overview:
Type of Services: ${formatArrayOrDefault(formData.projectType)}

Project Description:
${formData.description || 'Not provided'}

Timeline & Budget:
- Preferred Timeline: ${formData.timeline}
- Budget Range: ${getBudgetRangeText(formData.budgetRange)}
- Team Size: ${formData.teamSize || 'Not specified'}

Technical Requirements:
- Digital Workforce Scope: ${formData.workforce_simulation_scope || 'Not specified'}
- AI Agent Requirements: ${formatArrayOrDefault(formData.ai_agent_requirements)}

Additional Context:
- Company: ${formData.company || 'Not provided'}
- Pain Points: ${formatArrayOrDefault(formData.pain_points)}`;

  console.log("[ConsultationScheduler] Prepared Calendly data:", {
    name: formData.name,
    email: formData.email,
    meetingPrep
  });

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Please select a time that works best for you to discuss your project in detail.
      </p>
      <div className="min-h-[700px]">
        <CalendlyEmbed 
          url="https://calendly.com/belchonen18/30min" 
          prefill={{
            name: formData.name,
            email: formData.email,
            customAnswers: {
              a1: formData.company || 'Not provided',
              a2: formData.phone || 'Not provided',
              a3: meetingPrep
            }
          }}
        />
      </div>
    </div>
  );
};

export default ConsultationScheduler;