import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { FormData } from "@/components/project-start/types";
import { useIsMobile } from "@/hooks/use-mobile";

const ScheduleConsultation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const formData = location.state?.formData as FormData;

  if (!formData) {
    navigate('/start-project');
    return null;
  }

  const formatArrayOrDefault = (arr?: string[] | null, defaultText: string = 'None specified') => 
    arr && arr.length > 0 ? arr.join(', ') : defaultText;

  const getBudgetRangeText = (range?: string) => {
    if (!range) return 'Not specified';
    switch (range) {
      case "under-10000": return "Under $10,000";
      case "10000-25000": return "$10,000 - $25,000";
      case "25000-50000": return "$25,000 - $50,000";
      case "50000-100000": return "$50,000 - $100,000";
      case "100000-200000": return "$100,000 - $200,000";
      case "200000+": return "$200,000+";
      default: return range;
    }
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
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
              Schedule Your Consultation
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Please select a time that works best for you to discuss your project in detail.
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-sm rounded-xl shadow-lg border border-accent/10 overflow-hidden">
            <div className="h-[calc(100vh-300px)] min-h-[500px]">
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
        </div>
      </div>
    </div>
  );
};

export default ScheduleConsultation;