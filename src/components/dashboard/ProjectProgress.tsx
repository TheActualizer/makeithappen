import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Milestone, ChevronRight, CheckCircle2, Clock, ArrowRight, LayoutGrid } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectProgressProps {
  projectId?: string;
}

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignedTo?: string;
  sprint_id?: string;
}

interface Sprint {
  id: string;
  title: string;
  status: string;
  tasks: Task[];
}

const KANBAN_COLUMNS = [
  { id: 'backlog', title: 'Backlog', color: 'bg-gray-500' },
  { id: 'todo', title: 'To Do', color: 'bg-blue-500' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-yellow-500' },
  { id: 'review', title: 'Review', color: 'bg-purple-500' },
  { id: 'done', title: 'Done', color: 'bg-green-500' }
];

export function ProjectProgress({ projectId }: ProjectProgressProps) {
  const [milestones, setMilestones] = useState<any[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'timeline' | 'kanban'>('kanban');
  const [activeSprintId, setActiveSprintId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!projectId) return;

    const fetchProjectData = async () => {
      try {
        const [milestonesData, sprintsData, tasksData] = await Promise.all([
          supabase
            .from("milestones")
            .select("*")
            .eq("project_id", projectId)
            .order("created_at", { ascending: true }),
          supabase
            .from("sprints")
            .select("*, tasks(*)")
            .eq("project_id", projectId)
            .order("start_date", { ascending: true }),
          supabase
            .from("tasks")
            .select("*")
            .eq("sprint_id", projectId)
            .order("created_at", { ascending: true })
        ]);

        if (milestonesData.error) throw milestonesData.error;
        if (sprintsData.error) throw sprintsData.error;
        if (tasksData.error) throw tasksData.error;

        setMilestones(milestonesData.data || []);
        setSprints(sprintsData.data || []);
        setTasks(tasksData.data || []);
        
        // Set the first sprint as active by default
        if (sprintsData.data && sprintsData.data.length > 0) {
          setActiveSprintId(sprintsData.data[0].id);
        }
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

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: destination.droppableId })
        .eq('id', draggableId);

      if (error) throw error;

      // Update local state
      setTasks(tasks.map(task => 
        task.id === draggableId 
          ? { ...task, status: destination.droppableId }
          : task
      ));

      toast({
        title: "Task Updated",
        description: "Task status has been updated successfully",
      });
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
    }
  };

  const renderKanbanBoard = (sprintId: string) => (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {KANBAN_COLUMNS.map(column => (
          <div key={column.id} className="flex flex-col h-full">
            <div className={`p-2 rounded-t-lg ${column.color} text-white font-medium`}>
              {column.title}
            </div>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 min-h-[200px] bg-accent/50 rounded-b-lg p-2 space-y-2"
                >
                  {tasks
                    .filter(task => task.sprint_id === sprintId && task.status === column.id)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-background p-3 rounded-lg shadow-sm"
                          >
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant={task.priority === 'high' ? 'destructive' : 'outline'}>
                                {task.priority}
                              </Badge>
                              {task.assignedTo && (
                                <span className="text-xs text-muted-foreground">
                                  {task.assignedTo}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );

  if (loading) {
    return <div>Loading project progress...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-2 mb-4">
        <Badge 
          variant={view === 'timeline' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setView('timeline')}
        >
          Timeline
        </Badge>
        <Badge 
          variant={view === 'kanban' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setView('kanban')}
        >
          <LayoutGrid className="w-4 h-4 mr-1" />
          Kanban
        </Badge>
      </div>

      {view === 'kanban' ? (
        <Card>
          <CardHeader>
            <CardTitle>Sprint Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeSprintId || undefined} className="w-full">
              <TabsList className="w-full justify-start">
                {sprints.map((sprint) => (
                  <TabsTrigger
                    key={sprint.id}
                    value={sprint.id}
                    onClick={() => setActiveSprintId(sprint.id)}
                  >
                    {sprint.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {sprints.map((sprint) => (
                <TabsContent key={sprint.id} value={sprint.id}>
                  {renderKanbanBoard(sprint.id)}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {/* Existing timeline view */}
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
                    variant={milestone.status === "completed" ? "secondary" : "default"}
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
      )}
    </div>
  );
}

function calculateProgress(items: any[], statusField: string = "status") {
  if (!items.length) return 0;
  const completed = items.filter(
    (item) => item[statusField] === "completed"
  ).length;
  return Math.round((completed / items.length) * 100);
}