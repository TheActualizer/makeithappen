import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface UnityDataFlow {
  id: string;
  flow_type: string;
  status: string;
  input_data: any;
  output_data: any;
  metadata: any;
}

export const UnityDataFlow = () => {
  const [dataFlows, setDataFlows] = useState<UnityDataFlow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFlows = async () => {
      console.log('UnityDataFlow: Fetching data flows');
      const { data, error } = await supabase
        .from('unity_data_flows')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('UnityDataFlow: Error fetching data flows:', error);
      } else {
        console.log('UnityDataFlow: Data flows fetched:', data);
        setDataFlows(data || []);
      }
      setLoading(false);
    };

    // Set up real-time subscription
    const channel = supabase
      .channel('unity_data_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'unity_data_flows'
        },
        (payload) => {
          console.log('UnityDataFlow: Real-time update received:', payload);
          fetchDataFlows();
        }
      )
      .subscribe((status) => {
        console.log('UnityDataFlow: Subscription status:', status);
      });

    fetchDataFlows();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {dataFlows.map((flow, index) => (
        <motion.div
          key={flow.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-4 bg-accent/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{flow.flow_type}</h3>
              <Badge variant={flow.status === 'completed' ? 'default' : 'secondary'}>
                {flow.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Input Data:</p>
                <pre className="mt-1 p-2 rounded bg-background/50 overflow-auto max-h-24">
                  {JSON.stringify(flow.input_data, null, 2)}
                </pre>
              </div>
              <div>
                <p className="text-muted-foreground">Output Data:</p>
                <pre className="mt-1 p-2 rounded bg-background/50 overflow-auto max-h-24">
                  {JSON.stringify(flow.output_data, null, 2)}
                </pre>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};