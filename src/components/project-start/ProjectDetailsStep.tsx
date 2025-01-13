import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChartBar, Code2, DollarSign, Workflow, Target, AlertCircle } from "lucide-react";

interface ProjectDetailsStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const painPoints = [
  { id: "manual-processes", label: "Manual Processes" },
  { id: "data-accuracy", label: "Data Accuracy Issues" },
  { id: "integration", label: "Integration Challenges" },
  { id: "scalability", label: "Scalability Concerns" },
  { id: "security", label: "Security Compliance" },
  { id: "user-adoption", label: "User Adoption" },
  { id: "legacy-systems", label: "Legacy Systems" },
  { id: "cost-efficiency", label: "Cost Efficiency" }
];

const complexityLevels = [
  { value: "simple", label: "Simple - Straightforward implementation" },
  { value: "moderate", label: "Moderate - Some complexity involved" },
  { value: "complex", label: "Complex - Multiple integrations/features" }
];

const budgetRanges = [
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

const ProjectDetailsStep = ({ formData, setFormData }: ProjectDetailsStepProps) => {
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);

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

      <Card className="p-4 space-y-6 bg-accent/5">
        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Current Pain Points
          </label>
          <div className="grid grid-cols-2 gap-4">
            {painPoints.map((point) => (
              <div key={point.id} className="flex items-center space-x-2">
                <Checkbox
                  id={point.id}
                  checked={selectedPainPoints.includes(point.id)}
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
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <ChartBar className="w-4 h-4" />
            Project Complexity
          </label>
          <div className="flex flex-wrap gap-2">
            {complexityLevels.map((level) => (
              <Button
                key={level.value}
                variant={formData.complexity === level.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFormData({ ...formData, complexity: level.value })}
                className="flex-1"
              >
                {level.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Budget Range
          </label>
          <div className="grid grid-cols-2 gap-2">
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

        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <Target className="w-4 h-4" />
            Team Size
          </label>
          <div className="grid grid-cols-2 gap-2">
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

      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Code2 className="w-4 h-4" />
          Project Description
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