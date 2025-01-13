import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "./types";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ChartBar, Clock, Code2, DollarSign, Users, Workflow } from "lucide-react";

interface ProjectDetailsStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const ProjectDetailsStep = ({ formData, setFormData }: ProjectDetailsStepProps) => {
  const [complexity, setComplexity] = useState(50);
  const [teamSize, setTeamSize] = useState(5);
  const [budget, setBudget] = useState(50000);

  const handleMetricsChange = () => {
    setFormData({
      ...formData,
      complexity: complexity <= 30 ? "simple" : complexity <= 60 ? "moderate" : "complex",
      teamSize: teamSize,
      budgetRange: `[${budget - 10000}, ${budget + 10000})`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="projectType" className="text-sm font-medium flex items-center gap-2">
          <Workflow className="w-4 h-4" />
          Project Type
        </label>
        <Select
          value={formData.projectType}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              projectType: value as FormData["projectType"],
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="healthcare">Healthcare Technology</SelectItem>
            <SelectItem value="finance">Financial Services</SelectItem>
            <SelectItem value="real-estate">Real Estate Solutions</SelectItem>
            <SelectItem value="other">Other Industry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-4 space-y-4 bg-accent/5">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <ChartBar className="w-4 h-4" />
            Project Complexity
          </label>
          <Slider
            value={[complexity]}
            onValueChange={(value) => {
              setComplexity(value[0]);
              handleMetricsChange();
            }}
            max={100}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Simple</span>
            <span>Moderate</span>
            <span>Complex</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Users className="w-4 h-4" />
            Estimated Team Size
          </label>
          <Slider
            value={[teamSize]}
            onValueChange={(value) => {
              setTeamSize(value[0]);
              handleMetricsChange();
            }}
            max={20}
            step={1}
            className="py-4"
          />
          <div className="text-xs text-muted-foreground">
            {teamSize} team member{teamSize !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Budget Range
          </label>
          <Slider
            value={[budget]}
            onValueChange={(value) => {
              setBudget(value[0]);
              handleMetricsChange();
            }}
            max={200000}
            step={5000}
            className="py-4"
          />
          <div className="text-xs text-muted-foreground">
            ${(budget - 10000).toLocaleString()} - ${(budget + 10000).toLocaleString()}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Timeline Flexibility
          </label>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Urgent</span>
            <span>Flexible</span>
            <span>No Rush</span>
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Code2 className="w-4 h-4" />
          Project Description *
        </label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Please provide a detailed description of your project, including key features, challenges, and objectives..."
          className="min-h-[120px] bg-accent/5"
        />
      </div>
    </div>
  );
};

export default ProjectDetailsStep;