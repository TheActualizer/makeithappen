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

interface ProjectProgressProps {
  projectId?: string;
}

export function ProjectProgress({ projectId }: ProjectProgressProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [view, setView] = useState<'timeline' | 'kanban'>('kanban');
  const [activeSprintId, setActiveSprintId] = useState<string | null>(null);
  const { toast } = useToast();

  // Move Airtable functions to the top for better visibility
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
    if (!projectId) return;
    
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke('airtable-sync', {
        body: { projectId, operation: 'sync' }
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
    if (!projectId) return;

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

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

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

      // Update Airtable after successful Supabase update
      await supabase.functions.invoke('airtable-sync', {
        body: {
          operation: 'update',
          data: {
            recordId: draggableId,
            fields: {
              Status: destination.droppableId
            }
          }
        }
      });

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

  const calculateProgress = (items: any[], statusField: string = "status") => {
    if (!items.length) return 0;
    const completed = items.filter(
      (item) => item[statusField] === "completed"
    ).length;
    return Math.round((completed / items.length) * 100);
  };

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
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-blue-900">Airtable Integration</h2>
            <p className="text-sm text-blue-700 mt-1">
              Connect and sync your project data with Airtable
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              onClick={createAirtableBase}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Create Airtable Base
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={syncWithAirtable}
              disabled={syncing}
              className="border-blue-300 text-blue-700 hover:bg-blue-50 flex items-center gap-2"
            >
              <RefreshCw className={`h-5 w-5 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync with Airtable'}
            </Button>
          </div>
        </div>
      </div>

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
                    tasks={tasks}
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
