import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import { Sprint, Milestone } from "../../../types/project";

interface TimelineViewProps {
  milestones: Milestone[];
  sprints: Sprint[];
  calculateProgress: (items: any[], statusField?: string) => number;
}

export function TimelineView({ milestones, sprints, calculateProgress }: TimelineViewProps) {
  return (
    <div className="grid gap-4">
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