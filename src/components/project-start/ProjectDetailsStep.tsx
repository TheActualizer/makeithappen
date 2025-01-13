import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FormData, Timeline } from "./types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  BriefcaseIcon,
  BarChart3,
  DollarSign,
  Users,
  Bot,
  Calendar
} from "lucide-react";

const serviceTypes = [
  { value: "website", label: "Website & Digital Presence" },
  { value: "crm", label: "Customer Relationship Management" },
  { value: "accounting", label: "Financial & Accounting Systems" },
  { value: "marketing", label: "Marketing & Automation" },
  { value: "digital-workforce", label: "Digital Workforce & AI" },
  { value: "legal", label: "Legal Operations" },
  { value: "hr", label: "Human Resources" },
  { value: "other", label: "Other Services" }
];

const budgetRanges = [
  { value: "under-10000", label: "Under $10,000" },
  { value: "10000-25000", label: "$10,000 - $25,000" },
  { value: "25000-50000", label: "$25,000 - $50,000" },
  { value: "50000-100000", label: "$50,000 - $100,000" },
  { value: "100000-200000", label: "$100,000 - $200,000" },
  { value: "200000+", label: "$200,000+" }
];

const teamSizes = [
  { value: "1-5", label: "1-5 members" },
  { value: "6-10", label: "6-10 members" },
  { value: "11-20", label: "11-20 members" },
  { value: "20+", label: "20+ members" }
];

const timelineOptions: { value: Timeline; label: string }[] = [
  { value: "asap", label: "As Soon As Possible" },
  { value: "1-3-months", label: "1-3 Months" },
  { value: "3-6-months", label: "3-6 Months" },
  { value: "6-plus-months", label: "6+ Months" }
];

interface ProjectDetailsStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const ProjectDetailsStep = ({ formData, setFormData }: ProjectDetailsStepProps) => {
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>(formData.pain_points || []);
  const [selectedAgents, setSelectedAgents] = useState<string[]>(formData.ai_agent_requirements || []);

  const handleServiceTypeChange = (serviceValue: string) => {
    const currentServices = formData.projectType || [];
    const updatedServices = currentServices.includes(serviceValue)
      ? currentServices.filter(type => type !== serviceValue)
      : [...currentServices, serviceValue];
    
    setFormData({
      ...formData,
      projectType: updatedServices
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BriefcaseIcon className="w-5 h-5" />
          Project Scope Details
        </h2>
        
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium flex items-center gap-2">
              <BriefcaseIcon className="w-4 h-4" />
              Services Required
            </label>
            <div className="grid grid-cols-2 gap-3">
              {serviceTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={formData.projectType?.includes(type.value) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleServiceTypeChange(type.value)}
                  className="justify-start"
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <label className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Budget Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              {budgetRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={formData.budgetRange === range.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, budgetRange: range.value })}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <label className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Team Size
            </label>
            <div className="grid grid-cols-2 gap-3">
              {teamSizes.map((size) => (
                <Button
                  key={size.value}
                  variant={formData.teamSize === size.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, teamSize: size.value })}
                >
                  {size.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Preferred Timeline
            </label>
            <div className="grid grid-cols-2 gap-3">
              {timelineOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={formData.timeline === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, timeline: option.value as Timeline })}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="w-5 h-5" />
          AI & Automation Requirements
        </h2>
        
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium">Digital Workforce Scope</label>
            <Textarea
              value={formData.workforce_simulation_scope || ''}
              onChange={(e) =>
                setFormData({ ...formData, workforce_simulation_scope: e.target.value })
              }
              placeholder="Describe your digital workforce needs and objectives..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium">Project Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Please provide details about your project requirements and goals..."
              className="min-h-[100px]"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetailsStep;