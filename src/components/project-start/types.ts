export type Timeline = "asap" | "1-3-months" | "3-6-months" | "6-plus-months";
export type ProjectComplexity = "simple" | "moderate" | "complex";

export interface FormData {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  projectType: string[];
  description: string;
  timeline: Timeline;
  complexity?: ProjectComplexity;
  teamSize?: string | null;
  budgetRange?: string;
  pain_points?: string[];
  workforce_simulation_scope?: string | null;
  ai_agent_requirements?: string[];
  has_existing_codebase?: boolean;
  industry_vertical?: string;
  current_tech_stack?: Record<string, any>;
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
  target_completion_date?: string;
  project_constraints?: string[];
  project_timeline?: Record<string, any>;
}