export interface FormData {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  projectType: string[];
  description: string;
  timeline: string;
  pain_points: string[];
  complexity?: "simple" | "moderate" | "complex" | "enterprise";
  teamSize?: string;
  budgetRange?: string;
  has_existing_codebase?: boolean;
  industry_vertical?: string;
  current_tech_stack?: any;
  integration_requirements?: string[];
  preferred_technologies?: string[];
  data_sources?: string[];
  compliance_requirements?: string[];
  success_metrics?: string[];
  business_objectives?: string[];
  expected_roi?: string;
  success_criteria?: string[];
  decision_makers?: string[];
  automation_categories?: string[];
  current_manual_processes?: string[];
  desired_automation_outcomes?: string[];
  digital_transformation_goals?: string[];
  business_processes?: string[];
  target_completion_date?: Date;
  project_constraints?: string[];
  project_timeline?: any;
  ai_agent_requirements?: string[];
  workforce_simulation_scope?: string;
}