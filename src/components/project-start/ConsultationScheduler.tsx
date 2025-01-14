import CalendlyEmbed from "../CalendlyEmbed";
import { FormData } from "./types";

interface ConsultationSchedulerProps {
  formData: FormData;
}

const ConsultationScheduler = ({ formData }: ConsultationSchedulerProps) => {
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

  const formatPainPoints = (points?: string[] | null) => {
    if (!points || points.length === 0) return 'No specific challenges mentioned';
    const painPointLabels = {
      "time-consuming": "Time-consuming manual processes",
      "inefficient-workflows": "Inefficient workflows",
      "data-accuracy": "Data accuracy and consistency issues",
      "scalability": "Difficulty scaling operations",
      "integration": "Integration challenges with existing systems",
      "user-experience": "Poor user experience",
      "reporting": "Limited reporting and analytics",
      "compliance": "Compliance and security concerns",
      "cost": "High operational costs",
      "communication": "Communication gaps"
    };
    return points.map(point => painPointLabels[point as keyof typeof painPointLabels]).join('\n- ');
  };

  const meetingPrep = `Project Overview:
Type of Services: ${formatArrayOrDefault(formData.projectType)}

Project Vision:
${formData.description || 'Not provided'}

Current Challenges:
- ${formatPainPoints(formData.pain_points)}

Business Context:
- Company: ${formData.company || 'Not provided'}
- Team Size: ${formData.teamSize || 'Not specified'}
- Budget Range: ${getBudgetRangeText(formData.budgetRange)}

Contact Information:
- Phone: ${formData.phone || 'Not provided'}`;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Please select a time that works best for you to discuss your project in detail.
      </p>
      <div className="h-[600px]">
        <CalendlyEmbed 
          url="https://calendly.com/belchonen18/make-it-happen" 
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