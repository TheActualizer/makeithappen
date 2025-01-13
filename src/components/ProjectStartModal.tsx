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
import { supabase } from "@/integrations/supabase/client";

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "other",
  description: "",
  timeline: "asap",
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
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email)) {
      toast({
        title: "Required Fields",
        description: "Please fill in your name and email",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2 && !formData.description) {
      toast({
        title: "Required Fields",
        description: "Please provide a project description",
        variant: "destructive",
      });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log("Submitting form data:", formData);

      const { error: projectError } = await supabase
        .from('projects')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          project_type: formData.projectType,
          description: formData.description,
          timeline: formData.timeline,
        }]);

      if (projectError) {
        console.error('Project submission error:', projectError);
        throw new Error('Failed to save project');
      }

      toast({
        title: "Success!",
        description: "Your project details have been saved.",
      });
      
      // Check if user is authenticated for dashboard navigation
      const { data: { session } } = await supabase.auth.getSession();
      
      // Close the modal first
      onClose();
      
      // Then navigate if user is authenticated
      if (session?.user) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to save project details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookDemo = () => {
    // Open Calendly in a popup window
    const width = 550;
    const height = 700;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    
    window.open(
      'https://calendly.com/belchonen18/30min',
      'Book a Demo',
      `width=${width},height=${height},top=${top},left=${left},toolbar=0,location=0,menubar=0,directories=0,scrollbars=1`
    );
  };

  const renderStep = () => {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Start Your Project</DialogTitle>
          <DialogDescription>
            Fill out the form below to get started with your project.
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
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
          <div className="mt-16">{renderStep()}</div>
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            {step === 3 ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleBookDemo}
                  className="gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book a Demo
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save & Close"}
                </Button>
              </div>
            ) : (
              <Button onClick={handleNext} className="group">
                Next
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectStartModal;