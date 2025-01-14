import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LayoutGrid, RefreshCw, Plus } from "lucide-react";
import { KanbanBoard } from "./project-progress/KanbanBoard";
import { TimelineView } from "./project-progress/TimelineView";
import { Sprint, Task, Milestone } from "../../types/project";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

interface ProjectProgressProps {
  projectId?: string;
}

export function ProjectProgress({ projectId }: ProjectProgressProps) {
  const { projectId: paramProjectId } = useParams();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [view, setView] = useState<'timeline' | 'kanban'>('kanban');
  const [activeSprintId, setActiveSprintId] = useState<string | null>(null);
  const { toast } = useToast();

  const effectiveProjectId = projectId || paramProjectId;

  const calculateProgress = (items: any[], statusField: string = 'status') => {
    if (!items || items.length === 0) return 0;
    const completedItems = items.filter(item => 
      item[statusField] === 'completed' || 
      item[statusField] === 'done'
    );
    return Math.round((completedItems.length / items.length) * 100);
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination || !activeSprintId) return;

    const { draggableId, source, destination } = result;
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex(t => t.id === draggableId);
    
    if (taskIndex === -1) return;

    const task = updatedTasks[taskIndex];
    task.status = destination.droppableId;
    setTasks(updatedTasks);

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: destination.droppableId })
        .eq('id', draggableId);

      if (error) throw error;

      toast({
        title: "Task Updated",
        description: "Task status has been updated successfully",
      });
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update task status",
      });
    }
  };

  const createAirtableBase = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('airtable-sync', {
        body: { operation: 'create_base' }
      });

      if (error) throw error;

      console.log('Airtable base creation response:', data);
      toast({
        title: "Success",
        description: "Airtable base has been created. You can now sync your project data.",
      });
    } catch (error) {
      console.error('Error creating Airtable base:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create Airtable base. Please try again.",
      });
    }
  };

  const syncWithAirtable = async () => {
    if (!effectiveProjectId) return;
    
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke('airtable-sync', {
        body: { projectId: effectiveProjectId, operation: 'sync' }
      });

      if (error) throw error;

      console.log('Airtable sync response:', data);
      toast({
        title: "Sync Complete",
        description: "Project progress has been synced with Airtable",
      });

      // Refresh local data after sync
      await fetchProjectData();
    } catch (error) {
      console.error('Error syncing with Airtable:', error);
      toast({
        variant: "destructive",
        title: "Sync Failed",
        description: "Failed to sync with Airtable. Please try again.",
      });
    } finally {
      setSyncing(false);
    }
  };

  const fetchProjectData = async () => {
    if (!effectiveProjectId) {
      console.log("No projectId available, skipping data fetch");
      setLoading(false);
      return;
    }

    console.log("Fetching project data for projectId:", effectiveProjectId);
    try {
      // First, fetch milestones for the project
      const { data: milestonesData, error: milestonesError } = await supabase
        .from("milestones")
        .select("*")
        .eq("project_id", effectiveProjectId)
        .order("created_at", { ascending: true });

      if (milestonesError) throw milestonesError;

      // Then fetch sprints with their associated tasks
      const { data: sprintsData, error: sprintsError } = await supabase
        .from("sprints")
        .select(`
          *,
          tasks (*)
        `)
        .eq("project_id", effectiveProjectId)
        .order("start_date", { ascending: true });

      if (sprintsError) throw sprintsError;

      // Get all tasks for the project through sprints
      const allTasks = sprintsData?.reduce((acc: Task[], sprint) => {
        if (sprint.tasks) {
          return [...acc, ...sprint.tasks];
        }
        return acc;
      }, []) || [];

      console.log("Fetched data:", { milestonesData, sprintsData, allTasks });

      setMilestones(milestonesData || []);
      setSprints(sprintsData || []);
      setTasks(allTasks);
      
      if (sprintsData && sprintsData.length > 0) {
        setActiveSprintId(sprintsData[0].id);
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

  useEffect(() => {
    console.log("ProjectProgress useEffect triggered");
    fetchProjectData();
  }, [effectiveProjectId]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex justify-center items-center h-32">
          <span className="text-lg">Loading project progress...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Prominent Airtable Integration Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">Project Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-blue-900">Airtable Integration</h2>
              <p className="text-sm text-blue-700 mt-1">
                Connect and sync your project data with Airtable
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={createAirtableBase}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 min-w-[200px]"
              >
                <Plus className="h-5 w-5" />
                Create Airtable Base
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={syncWithAirtable}
                disabled={syncing}
                className="border-blue-300 text-blue-700 hover:bg-blue-50 flex items-center gap-2 min-w-[200px]"
              >
                <RefreshCw className={`h-5 w-5 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Syncing...' : 'Sync with Airtable'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Toggle Section */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
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
      </div>

      {/* Main Content */}
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
                  <KanbanBoard
                    sprintId={sprint.id}
                    tasks={tasks.filter(task => task.sprint_id === sprint.id)}
                    onDragEnd={handleDragEnd}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <TimelineView 
          milestones={milestones}
          sprints={sprints}
          calculateProgress={calculateProgress}
        />
      )}
    </div>
  );
}