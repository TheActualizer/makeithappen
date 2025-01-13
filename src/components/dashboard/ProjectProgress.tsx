import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Milestone, ChevronRight, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

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
        // Fetch milestones with next steps
        const { data: milestonesData, error: milestonesError } = await supabase
          .from("milestones")
          .select("*")
          .eq("project_id", projectId)
          .order("created_at", { ascending: true });

        if (milestonesError) throw milestonesError;

        // Fetch sprints with tasks and next steps
        const { data: sprintsData, error: sprintsError } = await supabase
          .from("sprints")
          .select("*, tasks(*, dependencies)")
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
              <div key={milestone.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  {milestone.status === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                  )}
                  <span className="flex-1 font-medium">{milestone.title}</span>
                  <Badge
                    variant={milestone.status === "completed" ? "success" : "default"}
                  >
                    {milestone.status}
                  </Badge>
                </div>
                {milestone.next_steps && milestone.next_steps.length > 0 && (
                  <div className="ml-6 space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Next Steps:</p>
                    {milestone.next_steps.map((step: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-3 w-3" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}
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
          <div className="space-y-6">
            {sprints
              .filter((sprint) => sprint.status === "active")
              .map((sprint) => (
                <div key={sprint.id} className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{sprint.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {calculateProgress(sprint.tasks)}%
                      </span>
                    </div>
                    <Progress
                      value={calculateProgress(sprint.tasks)}
                      className="mt-2 h-2"
                    />
                  </div>
                  
                  {sprint.next_steps && sprint.next_steps.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Sprint Next Steps:</p>
                      {sprint.next_steps.map((step: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <ArrowRight className="h-3 w-3" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {sprint.tasks && sprint.tasks.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Key Tasks:</p>
                      {sprint.tasks.slice(0, 3).map((task: any) => (
                        <div key={task.id} className="flex items-center gap-2 text-sm">
                          <Clock className="h-3 w-3" />
                          <span className="flex-1">{task.title}</span>
                          <Badge variant={task.priority === 'high' ? 'destructive' : 'outline'}>
                            {task.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}