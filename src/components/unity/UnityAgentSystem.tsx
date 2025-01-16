import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Brain, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';

interface UnityAgent {
  id: string;
  name: string;
  agent_type: string;
  status: string;
  capabilities: string[];
  last_active_at: string;
}

export const UnityAgentSystem = () => {
  const [agents, setAgents] = useState<UnityAgent[]>([]);

  useEffect(() => {
    const fetchAgents = async () => {
      console.log('UnityAgentSystem: Fetching agents');
      const { data, error } = await supabase
        .from('unity_agents')
        .select('*')
        .order('last_active_at', { ascending: false });

      if (error) {
        console.error('UnityAgentSystem: Error fetching agents:', error);
      } else {
        console.log('UnityAgentSystem: Agents fetched:', data);
        setAgents(data || []);
      }
    };

    // Set up real-time subscription for agent updates
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
          console.log('UnityAgentSystem: Real-time update received:', payload);
          fetchAgents();
        }
      )
      .subscribe((status) => {
        console.log('UnityAgentSystem: Subscription status:', status);
      });

    fetchAgents();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'analyzer':
        return <Brain className="h-5 w-5 text-blue-400" />;
      case 'processor':
        return <Workflow className="h-5 w-5 text-green-400" />;
      default:
        return <Activity className="h-5 w-5 text-purple-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map((agent, index) => (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
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
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Capabilities:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {agent.capabilities.map((capability) => (
                    <Badge key={capability} variant="outline">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Last active: {new Date(agent.last_active_at).toLocaleString()}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};