import { FormData } from "./types";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Bot } from "lucide-react";

interface AIRequirementsStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const AIRequirementsStep = ({ formData, setFormData }: AIRequirementsStepProps) => {
  return (
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
  );
};

export default AIRequirementsStep;