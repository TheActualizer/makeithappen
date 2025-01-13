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
  Settings,
} from "lucide-react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardForms } from "@/components/dashboard/DashboardForms";
import { DashboardCalendar } from "@/components/dashboard/DashboardCalendar";
import { DashboardActivity } from "@/components/dashboard/DashboardActivity";
import { useIsAdmin } from "@/hooks/useIsAdmin";

const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const { isAdmin, isLoading: isLoadingAdmin } = useIsAdmin();

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

  if (isLoadingAdmin) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          {isAdmin ? "Admin Dashboard" : "Dashboard"}
        </h1>
        {isAdmin && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Admin
          </span>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="forms" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {isAdmin ? "All Forms" : "My Forms"}
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
          )}
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardStats isAdmin={isAdmin} />
        </TabsContent>

        <TabsContent value="forms">
          <DashboardForms isAdmin={isAdmin} />
        </TabsContent>

        <TabsContent value="calendar">
          <DashboardCalendar />
        </TabsContent>

        {isAdmin && (
          <TabsContent value="users">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">User Management</h2>
              <p className="text-muted-foreground">
                Admin user management features coming soon...
              </p>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="activity">
          <DashboardActivity isAdmin={isAdmin} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;