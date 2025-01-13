import { FormData } from "./types";

interface TimelineStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const TimelineStep = ({ formData, setFormData }: TimelineStepProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="timeline" className="text-sm font-medium">
          Preferred Timeline
        </label>
        <select
          id="timeline"
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          value={formData.timeline}
          onChange={(e) =>
            setFormData({
              ...formData,
              timeline: e.target.value as FormData["timeline"],
            })
          }
        >
          <option value="asap">As Soon As Possible</option>
          <option value="1-3-months">1-3 Months</option>
          <option value="3-6-months">3-6 Months</option>
          <option value="6-plus-months">6+ Months</option>
        </select>
      </div>
      <div className="mt-6 p-4 bg-accent/20 rounded-lg">
        <h4 className="font-medium mb-2">Project Summary</h4>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="font-medium inline">Name:</dt>
            <dd className="inline ml-2">{formData.name}</dd>
          </div>
          <div>
            <dt className="font-medium inline">Email:</dt>
            <dd className="inline ml-2">{formData.email}</dd>
          </div>
          <div>
            <dt className="font-medium inline">Project Type:</dt>
            <dd className="inline ml-2 capitalize">{formData.projectType}</dd>
          </div>
          <div>
            <dt className="font-medium">Description:</dt>
            <dd className="mt-1">{formData.description}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default TimelineStep;