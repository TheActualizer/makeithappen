import CalendlyEmbed from "../CalendlyEmbed";
import { FormData } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

interface ConsultationSchedulerProps {
  formData: FormData;
}

const ConsultationScheduler = ({ formData }: ConsultationSchedulerProps) => {
  const isMobile = useIsMobile();
  
  const formatArrayOrDefault = (arr?: string[] | null, defaultText: string = 'None specified') => 
    arr && arr.length > 0 ? arr.join(', ') : defaultText;

  const getBudgetRangeText = (range?: string) => {
    if (!range) return 'Not specified';
    switch (range) {
      case "under-10000":
        return "Under $10,000";
      case "10000-25000":
        return "$10,000 - $25,000";
      case "25000-50000":
        return "$25,000 - $50,000";
      case "50000-100000":
        return "$50,000 - $100,000";
      case "100000-200000":
        return "$100,000 - $200,000";
      case "200000+":
        return "$200,000+";
      default:
        return range;
    }
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

  const formatComplexity = (complexity?: string) => {
    switch (complexity) {
      case 'simple': return 'Simple - Straightforward implementation';
      case 'moderate': return 'Moderate - Some complexity involved';
      case 'complex': return 'Complex - Significant technical challenges';
      default: return 'Not specified';
    }
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
- Project Complexity: ${formatComplexity(formData.complexity)}

Timeline & Planning:
- Timeline Preference: ${formData.timeline || 'Not specified'}

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone || 'Not provided'}`;

  return (
    <div className="flex flex-col h-full">
      <p className={`text-sm text-muted-foreground ${isMobile ? 'px-4 mb-4' : 'mb-4'}`}>
        Please select a time that works best for you to discuss your project in detail.
      </p>
      <div className={`flex-1 ${isMobile ? 'mx-4' : ''}`} style={{ minHeight: 0 }}>
        <CalendlyEmbed 
          url="https://calendly.com/belchonen18/make-it-happen" 
          prefill={{
            name: formData.name,
            email: formData.email,
            customAnswers: {
              a1: formData.projectType?.join(', ') || 'Not provided',
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