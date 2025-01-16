export interface UnityAgent {
  id: string;
  name: string;
  agent_type: string;
  status: string;
  capabilities: string[];
  configuration: Record<string, unknown>;
  last_active_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface UnityDataFlow {
  id: string;
  flow_type: string;
  status: string;
  input_data: Record<string, unknown>;
  output_data: Record<string, unknown>;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}
