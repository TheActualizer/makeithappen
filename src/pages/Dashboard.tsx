import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart, Users, Calendar, MessageSquare, FileText,
  Activity, PlusCircle, Briefcase, ExternalLink, DollarSign,
  ChevronDown,
} from "lucide-react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardDocuments } from "@/components/dashboard/DashboardDocuments";
import { DashboardCalendar } from "@/components/dashboard/DashboardCalendar";
import { DashboardActivity } from "@/components/dashboard/DashboardActivity";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProjectProgress } from "@/components/dashboard/ProjectProgress";
import { ProjectScope } from "@/components/dashboard/ProjectScope";
import { FinancialMetrics } from "@/components/dashboard/FinancialMetrics";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";
import ProjectStartModal from "@/components/ProjectStartModal";
import { useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

  const handleExpandSection = (section: string) => {
    navigate(`/dashboard/${section}`);
  };

  const renderSectionHeader = (title: string, icon: React.ReactNode, onExpand?: () => void) => (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {onExpand && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onExpand}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      )}
    </div>
  );

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

        <DashboardSections 
          isAdmin={isAdmin} 
          activeProjectId={activeProjectId} 
          handleExpandSection={handleExpandSection}
        />
      </div>

      <ProjectStartModal 
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
