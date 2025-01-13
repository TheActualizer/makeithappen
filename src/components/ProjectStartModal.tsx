import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Check, ChevronRight } from "lucide-react";

type ProjectType = "healthcare" | "finance" | "real-estate" | "other";
type Timeline = "asap" | "1-3-months" | "3-6-months" | "6-plus-months";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: ProjectType;
  description: string;
  timeline: Timeline;
}

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

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    toast({
      title: "Success!",
      description: "Your project details have been submitted. Let's schedule a call!",
    });
    // Here we'll redirect to calendar booking after implementing it
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name *
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email *
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">
                Company Name
              </label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                placeholder="Company Inc."
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="projectType" className="text-sm font-medium">
                Project Type
              </label>
              <select
                id="projectType"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={formData.projectType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projectType: e.target.value as ProjectType,
                  })
                }
              >
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="real-estate">Real Estate</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Project Description *
              </label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Tell us about your project..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="timeline" className="text-sm font-medium">
                Preferred Timeline
              </label>
              <select
                id="timeline"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={formData.timeline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    timeline: e.target.value as Timeline,
                  })
                }
              >
                <option value="asap">As Soon As Possible</option>
                <option value="1-3-months">1-3 Months</option>
                <option value="3-6-months">3-6 Months</option>
                <option value="6-plus-months">6+ Months</option>
              </select>
            </div>
            <div className="mt-6 p-4 bg-accent/20 rounded-lg">
              <h4 className="font-medium mb-2">Project Summary</h4>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="font-medium inline">Name:</dt>
                  <dd className="inline ml-2">{formData.name}</dd>
                </div>
                <div>
                  <dt className="font-medium inline">Email:</dt>
                  <dd className="inline ml-2">{formData.email}</dd>
                </div>
                <div>
                  <dt className="font-medium inline">Project Type:</dt>
                  <dd className="inline ml-2 capitalize">{formData.projectType}</dd>
                </div>
                <div>
                  <dt className="font-medium">Description:</dt>
                  <dd className="mt-1">{formData.description}</dd>
                </div>
              </dl>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Start Your Project</DialogTitle>
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
            <Button
              onClick={step === 3 ? handleSubmit : handleNext}
              className="group"
            >
              {step === 3 ? (
                "Submit"
              ) : (
                <>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectStartModal;