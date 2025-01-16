import React from 'react';
import { UnityDataFlow } from './UnityDataFlow';
import { UnityAgentSystem } from './UnityAgentSystem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

export const UnitySystemDashboard = () => {
  return (
    <Card className="p-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <h2 className="text-2xl font-bold mb-6">Unity System Dashboard</h2>
      
      <Tabs defaultValue="agents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="agents">Active Agents</TabsTrigger>
          <TabsTrigger value="flows">Data Flows</TabsTrigger>
        </TabsList>
        
        <TabsContent value="agents" className="space-y-4">
          <UnityAgentSystem />
        </TabsContent>
        
        <TabsContent value="flows" className="space-y-4">
          <UnityDataFlow />
        </TabsContent>
      </Tabs>
    </Card>
  );
};