import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Brain, Network, Workflow } from 'lucide-react';
import type { UnityAgent, UnityDataFlow, transformAgent, transformDataFlow } from '@/types/unity';

interface AgentMetrics {
  totalFlows: number;
  activeFlows: number;
  successRate: number;
  lastActivity: Date | null;
}

export const UnityAgentDashboard = () => {
  const [agents, setAgents] = useState<UnityAgent[]>([]);
  const [metrics, setMetrics] = useState<Record<string, AgentMetrics>>({});
  const [dataFlows, setDataFlows] = useState<UnityDataFlow[]>([]);

  useEffect(() => {
    console.log('UnityAgentDashboard: Initializing dashboard');
    fetchAgents();
    subscribeToAgentUpdates();
    subscribeToDataFlows();
  }, []);

  const fetchAgents = async () => {
    console.log('UnityAgentDashboard: Fetching agents');
    const { data, error } = await supabase
      .from('unity_agents')
      .select('*')
      .order('last_active_at', { ascending: false });

    if (error) {
      console.error('UnityAgentDashboard: Error fetching agents:', error);
      return;
    }

    console.log('UnityAgentDashboard: Agents fetched:', data);
    const transformedAgents = (data || []).map(transformAgent);
    setAgents(transformedAgents);
    calculateMetrics(transformedAgents);
  };

  const subscribeToAgentUpdates = () => {
    console.log('UnityAgentDashboard: Setting up agent subscription');
    const channel = supabase
      .channel('unity_agent_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'unity_agents'
        },
        (payload) => {
          console.log('UnityAgentDashboard: Agent update received:', payload);
          fetchAgents();
        }
      )
      .subscribe((status) => {
        console.log('UnityAgentDashboard: Subscription status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const subscribeToDataFlows = () => {
    console.log('UnityAgentDashboard: Setting up data flow subscription');
    const channel = supabase
      .channel('unity_flow_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'unity_data_flows'
        },
        (payload) => {
          console.log('UnityAgentDashboard: Data flow update received:', payload);
          fetchDataFlows();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const fetchDataFlows = async () => {
    console.log('UnityAgentDashboard: Fetching data flows');
    const { data, error } = await supabase
      .from('unity_data_flows')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('UnityAgentDashboard: Error fetching data flows:', error);
      return;
    }

    console.log('UnityAgentDashboard: Data flows fetched:', data);
    const transformedFlows = (data || []).map(transformDataFlow);
    setDataFlows(transformedFlows);
  };

  const calculateMetrics = (agents: UnityAgent[]) => {
    const newMetrics: Record<string, AgentMetrics> = {};
    
    agents.forEach(agent => {
      newMetrics[agent.id] = {
        totalFlows: dataFlows.filter(flow => 
          flow.metadata?.agent_id === agent.id
        ).length,
        activeFlows: dataFlows.filter(flow => 
          flow.metadata?.agent_id === agent.id && flow.status === 'active'
        ).length,
        successRate: calculateSuccessRate(agent.id),
        lastActivity: agent.last_active_at ? new Date(agent.last_active_at) : null
      };
    });

    setMetrics(newMetrics);
  };

  const calculateSuccessRate = (agentId: string) => {
    const agentFlows = dataFlows.filter(flow => 
      flow.metadata?.agent_id === agentId
    );
    
    if (agentFlows.length === 0) return 0;

    const successfulFlows = agentFlows.filter(flow => 
      flow.status === 'completed'
    ).length;

    return (successfulFlows / agentFlows.length) * 100;
  };

  const getAgentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'analyzer':
        return <Brain className="h-5 w-5 text-blue-400" />;
      case 'processor':
        return <Workflow className="h-5 w-5 text-green-400" />;
      case 'coordinator':
        return <Network className="h-5 w-5 text-purple-400" />;
      default:
        return <Activity className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 bg-accent/10 backdrop-blur-sm hover:bg-accent/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                {getAgentIcon(agent.agent_type)}
                <div>
                  <h3 className="font-semibold">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground">{agent.agent_type}</p>
                </div>
                <Badge 
                  variant={agent.status === 'active' ? 'default' : 'secondary'}
                  className="ml-auto"
                >
                  {agent.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Total Flows</p>
                  <p className="font-medium">{metrics[agent.id]?.totalFlows || 0}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Active Flows</p>
                  <p className="font-medium">{metrics[agent.id]?.activeFlows || 0}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Success Rate</p>
                  <p className="font-medium">
                    {Math.round(metrics[agent.id]?.successRate || 0)}%
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Last Active</p>
                  <p className="font-medium">
                    {metrics[agent.id]?.lastActivity 
                      ? new Date(metrics[agent.id].lastActivity!).toLocaleTimeString() 
                      : 'Never'}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
