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
  PlusCircle,
  Briefcase,
} from "lucide-react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardDocuments } from "@/components/dashboard/DashboardDocuments";
import { DashboardCalendar } from "@/components/dashboard/DashboardCalendar";
import { DashboardActivity } from "@/components/dashboard/DashboardActivity";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProjectProgress } from "@/components/dashboard/ProjectProgress";
import { ProjectScope } from "@/components/dashboard/ProjectScope";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";
import ProjectStartModal from "@/components/ProjectStartModal";

const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const { isAdmin, isLoading: isLoadingAdmin } = useIsAdmin();
  const [activeProjectId, setActiveProjectId] = useState<string | undefined>();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  useEffect(() => {
    const fetchFirstProject = async () => {
      const { data: projects, error } = await supabase
        .from("projects")
        .select("id")
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching project:", error);
        return;
      }

      if (projects) {
        setActiveProjectId(projects.id);
      }
    };

    fetchFirstProject();
  }, []);

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
    return <div className="min-h-screen bg-background"><DashboardHeader />Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            {isAdmin ? "Admin Dashboard" : "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsProjectModalOpen(true)}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              New Project
            </Button>
            {isAdmin && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Admin
              </span>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="scope" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Project Scope
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {isAdmin ? "All Documents" : "My Documents"}
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
              <MessageSquare className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardStats isAdmin={isAdmin} />
          </TabsContent>

          <TabsContent value="progress">
            <ProjectProgress projectId={activeProjectId} />
          </TabsContent>

          <TabsContent value="scope">
            <ProjectScope />
          </TabsContent>

          <TabsContent value="documents">
            <DashboardDocuments isAdmin={isAdmin} />
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

      <ProjectStartModal 
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;