import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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

const PAIN_POINTS = [
  { id: "time-consuming", label: "Time-consuming manual processes" },
  { id: "inefficient-workflows", label: "Inefficient workflows" },
  { id: "data-accuracy", label: "Data accuracy and consistency issues" },
  { id: "scalability", label: "Difficulty scaling operations" },
  { id: "integration", label: "Integration challenges with existing systems" },
  { id: "user-experience", label: "Poor user experience" },
  { id: "reporting", label: "Limited reporting and analytics" },
  { id: "compliance", label: "Compliance and security concerns" },
  { id: "cost", label: "High operational costs" },
  { id: "communication", label: "Communication gaps" }
];

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

  const handlePainPointChange = (pointId: string) => {
    const currentPoints = formData.pain_points || [];
    const updatedPoints = currentPoints.includes(pointId)
      ? currentPoints.filter(point => point !== pointId)
      : [...currentPoints, pointId];
    
    setFormData({
      ...formData,
      pain_points: updatedPoints
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

        <AccordionItem value="pain-points">
          <AccordionTrigger className="text-sm font-medium">
            Current Challenges
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PAIN_POINTS.map((point) => (
                <div key={point.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={point.id}
                    checked={(formData.pain_points || []).includes(point.id)}
                    onCheckedChange={() => handlePainPointChange(point.id)}
                  />
                  <label
                    htmlFor={point.id}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {point.label}
                  </label>
                </div>
              ))}
            </div>
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

        <AccordionItem value="description">
          <AccordionTrigger className="text-sm font-medium">
            Dream Product
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">What would your dream product be? What would it do for you?</label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe your ideal product and how it would transform your business..."
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