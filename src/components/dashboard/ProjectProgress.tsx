import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Milestone, ChevronRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProjectProgressProps {
  projectId?: string;
}

export function ProjectProgress({ projectId }: ProjectProgressProps) {
  const [milestones, setMilestones] = useState<any[]>([]);
  const [sprints, setSprints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!projectId) return;

    const fetchProjectData = async () => {
      try {
        // Fetch milestones
        const { data: milestonesData, error: milestonesError } = await supabase
          .from("milestones")
          .select("*")
          .eq("project_id", projectId)
          .order("created_at", { ascending: true });

        if (milestonesError) throw milestonesError;

        // Fetch sprints
        const { data: sprintsData, error: sprintsError } = await supabase
          .from("sprints")
          .select("*, tasks(*)")
          .eq("project_id", projectId)
          .order("start_date", { ascending: true });

        if (sprintsError) throw sprintsError;

        setMilestones(milestonesData || []);
        setSprints(sprintsData || []);
      } catch (error) {
        console.error("Error fetching project data:", error);
        toast({
          title: "Error",
          description: "Failed to load project progress data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId, toast]);

  const calculateProgress = (items: any[], statusField: string = "status") => {
    if (!items.length) return 0;
    const completed = items.filter(
      (item) => item[statusField] === "completed"
    ).length;
    return Math.round((completed / items.length) * 100);
  };

  if (loading) {
    return <div>Loading project progress...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Overall Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-2">
            <Progress value={calculateProgress(milestones)} className="h-2" />
            <p className="mt-2 text-sm text-muted-foreground">
              {calculateProgress(milestones)}% Complete
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Milestones Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            <div className="flex items-center gap-2">
              <Milestone className="h-5 w-5" />
              Milestones
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center gap-2">
                {milestone.status === "completed" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                )}
                <span className="flex-1">{milestone.title}</span>
                <span
                  className={`text-sm ${
                    milestone.status === "completed"
                      ? "text-green-500"
                      : "text-blue-500"
                  }`}
                >
                  {milestone.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sprints Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Active Sprints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sprints
              .filter((sprint) => sprint.status === "active")
              .map((sprint) => (
                <div key={sprint.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{sprint.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {calculateProgress(sprint.tasks)}%
                    </span>
                  </div>
                  <Progress
                    value={calculateProgress(sprint.tasks)}
                    className="h-2"
                  />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}