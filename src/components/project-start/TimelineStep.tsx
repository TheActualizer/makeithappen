import { FormData } from "./types";

interface TimelineStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const TimelineStep = ({ formData, setFormData }: TimelineStepProps) => {
  const formatBudgetRange = (range: string | undefined) => {
    if (!range) return "Not specified";
    switch (range) {
      case "under-10000":
        return "Under $10,000";
      case "10000-25000":
        return "$10,000 - $25,000";
      case "25000-50000":
        return "$25,000 - $50,000";
      case "50000-100000":
        return "$50,000 - $100,000";
      case "100000-200000":
        return "$100,000 - $200,000";
      case "200000+":
        return "$200,000+";
      default:
        return "Not specified";
    }
  };

  const formatTimeline = (timeline: string) => {
    switch (timeline) {
      case "asap":
        return "As Soon As Possible";
      case "1-3-months":
        return "1-3 Months";
      case "3-6-months":
        return "3-6 Months";
      case "6-plus-months":
        return "6+ Months";
      default:
        return timeline;
    }
  };

  return (
    <div className="space-y-4">
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
                <dd>{formatTimeline(formData.timeline)}</dd>
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