import { Json } from '@/integrations/supabase/types';

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

// Helper function to transform Supabase data to our types
export const transformAgent = (agent: {
  capabilities: Json;
  configuration: Json;
  [key: string]: any;
}): UnityAgent => ({
  ...agent,
  capabilities: Array.isArray(agent.capabilities) ? agent.capabilities : [],
  configuration: typeof agent.configuration === 'object' ? agent.configuration : {}
});

export const transformDataFlow = (flow: {
  input_data: Json;
  output_data: Json;
  metadata: Json;
  [key: string]: any;
}): UnityDataFlow => ({
  ...flow,
  input_data: typeof flow.input_data === 'object' ? flow.input_data : {},
  output_data: typeof flow.output_data === 'object' ? flow.output_data : {},
  metadata: typeof flow.metadata === 'object' ? flow.metadata : {}
});