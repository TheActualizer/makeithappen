export interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignedTo?: string;
  sprint_id?: string;
}

export interface Sprint {
  id: string;
  title: string;
  status: string;
  tasks: Task[];
  start_date?: string;
  end_date?: string;
}

export interface Milestone {
  id: string;
  title: string;
  status: string;
  next_steps?: string[];
}

export interface Project {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string[];
  description: string;
  timeline: string;
  budget_range: string | null;
  team_size: number | null;
  complexity: "simple" | "moderate" | "complex" | "enterprise" | null;
  workforce_simulation_scope: string | null;
  ai_agent_requirements: string[] | null;
  pain_points: string[] | null;
  status?: 'active' | 'completed' | 'on_hold' | 'planning';
  priority?: 'high' | 'medium' | 'low';
  last_updated?: string;
  actual_cost?: number;
  estimated_cost?: number;
  budget_spent?: number;
  budget_remaining?: number;
  advancement_status?: {
    requirements_completed: number;
    design_completed: number;
    development_completed: number;
    testing_completed: number;
    deployment_completed: number;
  };
}