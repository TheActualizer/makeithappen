import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { FormData } from "./types";

interface ScheduleStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const ScheduleStep = ({ formData, setFormData }: ScheduleStepProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-medium">
          Schedule Your Consultation
        </div>
        <Calendar
          mode="single"
          selected={formData.consultationDate}
          onSelect={(date) =>
            setFormData({ ...formData, consultationDate: date })
          }
          className="rounded-md border"
          disabled={(date) => date < new Date()}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-medium">
          <Clock className="h-5 w-5 text-secondary" />
          Available Time Slots
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"].map((time) => (
            <Button
              key={time}
              variant={selectedTime === time ? "default" : "outline"}
              className="w-full"
              onClick={() => {
                setSelectedTime(time);
                setFormData({ ...formData, consultationTime: time });
              }}
            >
              {time}
            </Button>
          ))}
        </div>
      </div>

      {formData.consultationDate && formData.consultationTime && (
        <div className="p-4 bg-accent/20 rounded-lg">
          <h4 className="font-medium mb-2">Selected Consultation Time</h4>
          <p>
            {formData.consultationDate.toLocaleDateString()} at{" "}
            {formData.consultationTime}
          </p>
        </div>
      )}
    </div>
  );
};

export default ScheduleStep;