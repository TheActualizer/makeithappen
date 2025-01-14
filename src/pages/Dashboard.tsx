import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart, Users, Calendar, MessageSquare, FileText,
  Activity, PlusCircle, Briefcase, ExternalLink, DollarSign,
  ChevronDown, History
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
import { useMessages } from "@/hooks/useMessages";
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
  const { messages } = useMessages();

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

        <div className="grid gap-6">
          {/* Stats Section */}
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
                {renderSectionHeader("Overview", <BarChart className="h-5 w-5" />)}
                <ChevronDown className="h-4 w-4" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <DashboardStats isAdmin={isAdmin} />
            </CollapsibleContent>
          </Collapsible>

          {/* Documents Section */}
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
                {renderSectionHeader(
                  isAdmin ? "All Documents" : "My Documents",
                  <FileText className="h-5 w-5" />
                )}
                <ChevronDown className="h-4 w-4" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <DashboardDocuments isAdmin={isAdmin} />
            </CollapsibleContent>
          </Collapsible>

          {/* Project Scope Section */}
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
                {renderSectionHeader("Project Scope", <Briefcase className="h-5 w-5" />)}
                <ChevronDown className="h-4 w-4" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <ProjectScope />
            </CollapsibleContent>
          </Collapsible>

          {/* Project Progress Section */}
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
                {renderSectionHeader("Project Progress", <Activity className="h-5 w-5" />)}
                <ChevronDown className="h-4 w-4" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <ProjectProgress projectId={activeProjectId} />
            </CollapsibleContent>
          </Collapsible>

          {/* Calendar Section */}
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
                {renderSectionHeader("Calendar", <Calendar className="h-5 w-5" />)}
                <ChevronDown className="h-4 w-4" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <DashboardCalendar />
            </CollapsibleContent>
          </Collapsible>

          {/* Activity Section */}
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
                {renderSectionHeader("Recent Activity", <MessageSquare className="h-5 w-5" />)}
                <ChevronDown className="h-4 w-4" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <DashboardActivity isAdmin={isAdmin} />
            </CollapsibleContent>
          </Collapsible>

          {/* Chat History Section */}
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
                {renderSectionHeader("Chat History", <History className="h-5 w-5" />)}
                <ChevronDown className="h-4 w-4" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <Card className="p-6">
                <div className="space-y-4">
                  {messages?.map((message, index) => (
                    <div
                      key={message.id || index}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{message.content}</span>
                        <span className="text-sm text-muted-foreground">
                          {message.type === 'ai' ? 'AI Assistant' : 'You'}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(message.created_at || '').toLocaleString()}
                      </span>
                    </div>
                  ))}
                  {(!messages || messages.length === 0) && (
                    <p className="text-muted-foreground">No chat history available.</p>
                  )}
                </div>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          {/* Financial Metrics Section */}
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
                {renderSectionHeader("Financial Metrics", <DollarSign className="h-5 w-5" />)}
                <ChevronDown className="h-4 w-4" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <FinancialMetrics projectId={activeProjectId} />
            </CollapsibleContent>
          </Collapsible>

          {/* Admin Users Section */}
          {isAdmin && (
            <Collapsible>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
                  {renderSectionHeader("User Management", <Users className="h-5 w-5" />)}
                  <ChevronDown className="h-4 w-4" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <Card className="p-6">
                  <p className="text-muted-foreground">
                    Admin user management features coming soon...
                  </p>
                </Card>
              </CollapsibleContent>
            </Collapsible>
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
