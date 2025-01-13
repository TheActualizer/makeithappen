import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  BriefcaseIcon,
  BarChart3,
  DollarSign,
  Users,
  Bot,
  AlertCircle,
  Globe,
  LayoutDashboard,
  Calculator,
  Megaphone,
  Scale,
  UserCog,
  Workflow
} from "lucide-react";

// Moving these to a separate configuration file would be a good next step
const serviceTypes = [
  { value: "website", label: "Website Development" },
  { value: "crm", label: "CRM System Setup" },
  { value: "accounting", label: "Accounting System" },
  { value: "marketing", label: "Marketing Automation" },
  { value: "digital-workforce", label: "AI Workforce Setup" },
  { value: "legal", label: "Legal Department Setup" },
  { value: "hr", label: "HR Department Setup" },
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

interface ProjectDetailsStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const ProjectDetailsStep = ({ formData, setFormData }: ProjectDetailsStepProps) => {
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>(formData.pain_points || []);
  const [selectedAgents, setSelectedAgents] = useState<string[]>(formData.ai_agent_requirements || []);

  const handlePainPointChange = (pointId: string) => {
    setSelectedPainPoints(current => {
      const updated = current.includes(pointId)
        ? current.filter(id => id !== pointId)
        : [...current, pointId];
      
      setFormData({
        ...formData,
        pain_points: updated
      });
      
      return updated;
    });
  };

  const handleAgentRequirementChange = (agentId: string) => {
    setSelectedAgents(current => {
      const updated = current.includes(agentId)
        ? current.filter(id => id !== agentId)
        : [...current, agentId];
      
      setFormData({
        ...formData,
        ai_agent_requirements: updated
      });
      
      return updated;
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5" />
          Project Scope Details
        </h2>
        
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium flex items-center gap-2">
              <BriefcaseIcon className="w-4 h-4" />
              Service Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {serviceTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={formData.projectType === type.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, projectType: type.value })}
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