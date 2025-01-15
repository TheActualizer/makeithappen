import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart, Users, Calendar, MessageSquare, FileText,
  Activity, PlusCircle, Briefcase, DollarSign, History
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardDocuments } from "@/components/dashboard/DashboardDocuments";
import { DashboardCalendar } from "@/components/dashboard/DashboardCalendar";
import { DashboardActivity } from "@/components/dashboard/DashboardActivity";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProjectProgress } from "@/components/dashboard/ProjectProgress";
import { ProjectScope } from "@/components/dashboard/ProjectScope";
import { FinancialMetrics } from "@/components/dashboard/FinancialMetrics";
import { ChatHistorySection } from "@/components/dashboard/ChatHistorySection";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { SocialMarketplace } from "@/components/dashboard/SocialMarketplace";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";
import ProjectStartModal from "@/components/ProjectStartModal";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  const { isAdmin, isLoading: isLoadingAdmin } = useIsAdmin();
  const [activeProjectId, setActiveProjectId] = useState<string | undefined>();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const navigate = useNavigate();

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

        <div className="grid gap-6">
          <DashboardSection title="Overview" icon={<BarChart className="h-5 w-5" />}>
            <DashboardStats isAdmin={isAdmin} />
          </DashboardSection>

          <DashboardSection title="Professional Network" icon={<Users className="h-5 w-5" />}>
            <SocialMarketplace />
          </DashboardSection>

          <DashboardSection 
            title={isAdmin ? "All Documents" : "My Documents"} 
            icon={<FileText className="h-5 w-5" />}
          >
            <DashboardDocuments isAdmin={isAdmin} />
          </DashboardSection>

          <DashboardSection title="Project Scope" icon={<Briefcase className="h-5 w-5" />}>
            <ProjectScope />
          </DashboardSection>

          <DashboardSection title="Project Progress" icon={<Activity className="h-5 w-5" />}>
            <ProjectProgress projectId={activeProjectId} />
          </DashboardSection>

          <DashboardSection title="Calendar" icon={<Calendar className="h-5 w-5" />}>
            <DashboardCalendar />
          </DashboardSection>

          <DashboardSection title="Recent Activity" icon={<MessageSquare className="h-5 w-5" />}>
            <DashboardActivity isAdmin={isAdmin} />
          </DashboardSection>

          <DashboardSection title="Chat History" icon={<History className="h-5 w-5" />}>
            <ChatHistorySection />
          </DashboardSection>

          <DashboardSection title="Financial Metrics" icon={<DollarSign className="h-5 w-5" />}>
            <FinancialMetrics projectId={activeProjectId} />
          </DashboardSection>

          {isAdmin && (
            <DashboardSection title="User Management" icon={<Users className="h-5 w-5" />}>
              <Card className="p-6">
                <p className="text-muted-foreground">
                  Admin user management features coming soon...
                </p>
              </Card>
            </DashboardSection>
          )}
        </div>
      </div>

      <ProjectStartModal 
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;

