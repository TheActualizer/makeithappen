import { FormData } from "./types";
import CalendlyEmbed from "../CalendlyEmbed";

interface ScheduleStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const ScheduleStep = ({ formData, setFormData }: ScheduleStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-medium">
          Schedule Your Consultation
        </div>
        <div className="h-[500px]">
          <CalendlyEmbed url="https://calendly.com/belchonen18/30min" />
        </div>
      </div>
    </div>
  );
};

export default ScheduleStep;