import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Bot } from "lucide-react";
import { FormData } from "./types";
import { ServiceTypeSection } from "./sections/ServiceTypeSection";
import { BudgetSection } from "./sections/BudgetSection";
import { TeamSizeSection } from "./sections/TeamSizeSection";

interface ProjectDetailsStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const ProjectDetailsStep = ({ formData, setFormData }: ProjectDetailsStepProps) => {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="p-4 space-y-4">
        <ServiceTypeSection 
          formData={formData}
          onServiceTypeChange={handleServiceTypeChange}
        />
        
        <div className="h-px bg-border" />
        
        <BudgetSection
          formData={formData}
          onBudgetChange={(value) => setFormData({ ...formData, budgetRange: value })}
        />
        
        <div className="h-px bg-border" />
        
        <TeamSizeSection
          formData={formData}
          onTeamSizeChange={(value) => setFormData({ ...formData, teamSize: value })}
        />
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="w-5 h-5" />
          AI & Automation Requirements
        </h2>
        
        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Digital Workforce Scope</label>
            <Textarea
              value={formData.workforce_simulation_scope || ''}
              onChange={(e) =>
                setFormData({ ...formData, workforce_simulation_scope: e.target.value })
              }
              placeholder="Describe your digital workforce needs and objectives..."
              className="min-h-[100px] resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Project Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Please provide details about your project requirements and goals..."
              className="min-h-[100px] resize-y"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetailsStep;