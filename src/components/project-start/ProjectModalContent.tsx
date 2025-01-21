import { FormData } from "./types";
import BasicInfoStep from "./BasicInfoStep";
import ProjectDetailsStep from "./ProjectDetailsStep";
import TimelineStep from "./TimelineStep";
import ConsultationScheduler from "./ConsultationScheduler";

interface ProjectModalContentProps {
  step: number;
  showCalendly: boolean;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const ProjectModalContent = ({ 
  step, 
  showCalendly, 
  formData, 
  setFormData 
}: ProjectModalContentProps) => {
  if (showCalendly) {
    return <ConsultationScheduler formData={formData} />;
  }

  switch (step) {
    case 1:
      return <BasicInfoStep formData={formData} setFormData={setFormData} />;
    case 2:
      return <ProjectDetailsStep formData={formData} setFormData={setFormData} />;
    case 3:
      return <TimelineStep formData={formData} setFormData={setFormData} />;
    default:
      return null;
  }
};

export default ProjectModalContent;