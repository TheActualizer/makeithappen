import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Activity,
} from "lucide-react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardForms } from "@/components/dashboard/DashboardForms";
import { DashboardCalendar } from "@/components/dashboard/DashboardCalendar";
import { DashboardActivity } from "@/components/dashboard/DashboardActivity";

const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel("dashboard-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        (payload) => {
          console.log("Real-time update:", payload);
          toast({
            title: "New Activity",
            description: "Dashboard data has been updated.",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="forms" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Forms
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardStats />
        </TabsContent>

        <TabsContent value="forms">
          <DashboardForms />
        </TabsContent>

        <TabsContent value="calendar">
          <DashboardCalendar />
        </TabsContent>

        <TabsContent value="users">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <p className="text-muted-foreground">
              User management features coming soon...
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <DashboardActivity />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;