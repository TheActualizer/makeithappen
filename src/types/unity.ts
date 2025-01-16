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

export const transformAgent = (agent: {
  capabilities: Json;
  configuration: Json;
  [key: string]: any;
}): UnityAgent => ({
  ...agent,
  capabilities: Array.isArray(agent.capabilities) 
    ? agent.capabilities.map(cap => String(cap))
    : [],
  configuration: typeof agent.configuration === 'object' && agent.configuration !== null
    ? agent.configuration as Record<string, unknown>
    : {}
});

export const transformDataFlow = (flow: {
  input_data: Json;
  output_data: Json;
  metadata: Json;
  [key: string]: any;
}): UnityDataFlow => ({
  ...flow,
  input_data: typeof flow.input_data === 'object' && flow.input_data !== null
    ? flow.input_data as Record<string, unknown>
    : {},
  output_data: typeof flow.output_data === 'object' && flow.output_data !== null
    ? flow.output_data as Record<string, unknown>
    : {},
  metadata: typeof flow.metadata === 'object' && flow.metadata !== null
    ? flow.metadata as Record<string, unknown>
    : {}
});