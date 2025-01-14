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
}