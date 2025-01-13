import { Textarea } from "@/components/ui/textarea";
import { FormData } from "./types";

interface ProjectDetailsStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const ProjectDetailsStep = ({ formData, setFormData }: ProjectDetailsStepProps) => {
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
              projectType: e.target.value as FormData["projectType"],
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
};

export default ProjectDetailsStep;