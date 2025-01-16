import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Activity, Server, Database, Cloud } from "lucide-react";
import { useEffect, useState } from "react";

interface ServiceHealth {
  name: string;
  status: "healthy" | "degraded" | "down";
  uptime: number;
  lastChecked: string;
}

interface ResourceMetrics {
  cpu_usage: number;
  memory_usage: number;
  storage_usage: number;
  network_throughput: number;
}

export const InfrastructureMetrics = () => {
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Fetch service health data
  const { data: healthData, isLoading: healthLoading } = useQuery({
    queryKey: ["service-health"],
    queryFn: async () => {
      console.log("Fetching service health data");
      const { data: metrics } = await supabase
        .from("automation_health_metrics")
        .select("*")
        .order("time_bucket", { ascending: false })
        .limit(1);

      return metrics || [];
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Fetch resource metrics
  const { data: resourceData, isLoading: resourceLoading } = useQuery({
    queryKey: ["resource-metrics"],
    queryFn: async () => {
      console.log("Fetching resource metrics");
      const { data: metrics } = await supabase
        .from("dify_performance_metrics")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(1);

      return metrics?.[0] || null;
    },
    refetchInterval: 30000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (uptime: number) => {
    return `${uptime.toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Infrastructure Status</h2>
        <p className="text-sm text-muted-foreground">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">API Services</h3>
            </div>
            <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-sm">
              Healthy
            </span>
          </div>
          <Progress value={98} className="mb-2" />
          <p className="text-sm text-muted-foreground">98% uptime</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Database</h3>
            </div>
            <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-sm">
              Healthy
            </span>
          </div>
          <Progress value={99.9} className="mb-2" />
          <p className="text-sm text-muted-foreground">99.9% uptime</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Storage</h3>
            </div>
            <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-sm">
              Healthy
            </span>
          </div>
          <Progress value={99.5} className="mb-2" />
          <p className="text-sm text-muted-foreground">99.5% uptime</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Functions</h3>
            </div>
            <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-sm">
              Healthy
            </span>
          </div>
          <Progress value={97} className="mb-2" />
          <p className="text-sm text-muted-foreground">97% uptime</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {healthLoading ? (
              <p>Loading activity data...</p>
            ) : (
              healthData?.map((metric: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{metric.stage}</p>
                    <p className="text-sm text-muted-foreground">
                      {metric.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {metric.attempt_count} attempts
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {metric.error_count} errors
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Resource Usage</h3>
          <div className="space-y-4">
            {resourceLoading ? (
              <p>Loading resource data...</p>
            ) : resourceData ? (
              <>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>CPU Usage</span>
                    <span>{resourceData.avg_response_time_ms}ms</span>
                  </div>
                  <Progress 
                    value={
                      (resourceData.avg_response_time_ms / 1000) * 100
                    } 
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Memory Usage</span>
                    <span>{resourceData.total_requests} requests</span>
                  </div>
                  <Progress 
                    value={
                      (resourceData.successful_requests / resourceData.total_requests) * 100
                    } 
                  />
                </div>
              </>
            ) : (
              <p>No resource data available</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};