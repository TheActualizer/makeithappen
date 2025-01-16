export interface UnityAgent {
  id: string;
  name: string;
  agent_type: string;
  status: string;
  capabilities: string[];
  configuration: Record<string, unknown>;
  last_active_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UnityDataFlow {
  id: string;
  flow_type: string;
  status: string;
  input_data: Record<string, unknown>;
  output_data: Record<string, unknown>;
  metadata: {
    agent_id?: string;
    [key: string]: unknown;
  };
  created_at: string;
  updated_at: string;
}