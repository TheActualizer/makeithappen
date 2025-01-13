import { FormData } from "./types";

interface TimelineStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const TimelineStep = ({ formData, setFormData }: TimelineStepProps) => {
  const formatBudgetRange = (range: string | undefined) => {
    if (!range) return "Not specified";
    const [min, max] = range.split('-').map(num => 
      Number(num).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    );
    return `${min} - ${max}`;
  };

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

      <div className="mt-6 p-6 bg-accent/20 rounded-lg space-y-6">
        <h4 className="font-medium text-lg">Project Summary</h4>
        
        <div className="space-y-4">
          <section className="space-y-2">
            <h5 className="font-medium">Contact Information</h5>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="font-medium">Name:</dt>
                <dd>{formData.name || "Not provided"}</dd>
              </div>
              <div>
                <dt className="font-medium">Email:</dt>
                <dd>{formData.email || "Not provided"}</dd>
              </div>
              <div>
                <dt className="font-medium">Phone:</dt>
                <dd>{formData.phone || "Not provided"}</dd>
              </div>
              <div>
                <dt className="font-medium">Company:</dt>
                <dd>{formData.company || "Not provided"}</dd>
              </div>
            </dl>
          </section>

          <section className="space-y-2">
            <h5 className="font-medium">Project Details</h5>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-medium">Services Required:</dt>
                <dd className="mt-1">
                  {formData.projectType && formData.projectType.length > 0 
                    ? formData.projectType.map((type, index) => (
                        <span key={type} className="inline-block bg-primary/10 rounded px-2 py-1 text-xs mr-2 mb-2">
                          {type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      ))
                    : "Not specified"}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Budget Range:</dt>
                <dd>{formatBudgetRange(formData.budgetRange)}</dd>
              </div>
              <div>
                <dt className="font-medium">Team Size:</dt>
                <dd>{formData.teamSize || "Not specified"}</dd>
              </div>
              <div>
                <dt className="font-medium">Project Timeline:</dt>
                <dd className="capitalize">{formData.timeline.replace(/-/g, ' ') || "Not specified"}</dd>
              </div>
            </dl>
          </section>

          <section className="space-y-2">
            <h5 className="font-medium">Digital Workforce & AI Requirements</h5>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-medium">Workforce Simulation Scope:</dt>
                <dd className="mt-1">{formData.workforce_simulation_scope || "Not specified"}</dd>
              </div>
              <div>
                <dt className="font-medium">AI Agent Requirements:</dt>
                <dd className="mt-1">
                  {formData.ai_agent_requirements && formData.ai_agent_requirements.length > 0 
                    ? formData.ai_agent_requirements.map((req, index) => (
                        <span key={index} className="inline-block bg-primary/10 rounded px-2 py-1 text-xs mr-2 mb-2">
                          {req}
                        </span>
                      ))
                    : "Not specified"}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Project Description:</dt>
                <dd className="mt-1">{formData.description || "Not provided"}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TimelineStep;