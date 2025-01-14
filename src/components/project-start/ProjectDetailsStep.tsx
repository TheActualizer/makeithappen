import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Bot, ChevronDown } from "lucide-react";
import { FormData } from "./types";
import { ServiceTypeSection } from "./sections/ServiceTypeSection";
import { BudgetSection } from "./sections/BudgetSection";
import { TeamSizeSection } from "./sections/TeamSizeSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div className="space-y-4">
      <Accordion type="single" collapsible defaultValue="services" className="w-full">
        <AccordionItem value="services">
          <AccordionTrigger className="text-sm font-medium">
            Services Required
          </AccordionTrigger>
          <AccordionContent>
            <ServiceTypeSection 
              formData={formData}
              onServiceTypeChange={handleServiceTypeChange}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="budget">
          <AccordionTrigger className="text-sm font-medium">
            Budget Range
          </AccordionTrigger>
          <AccordionContent>
            <BudgetSection
              formData={formData}
              onBudgetChange={(value) => setFormData({ ...formData, budgetRange: value })}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="team">
          <AccordionTrigger className="text-sm font-medium">
            Team Size
          </AccordionTrigger>
          <AccordionContent>
            <TeamSizeSection
              formData={formData}
              onTeamSizeChange={(value) => setFormData({ ...formData, teamSize: value })}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ai">
          <AccordionTrigger className="text-sm font-medium">
            AI & Automation Requirements
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProjectDetailsStep;