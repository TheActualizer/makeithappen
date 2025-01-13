import { supabase } from "@/integrations/supabase/client";
import { Task } from "@/types/project";

export const handleDragEnd = async (result: any, tasks: Task[]) => {
  if (!result.destination) return;

  const { source, destination } = result;
  const taskId = result.draggableId;
  const newStatus = destination.droppableId;

  try {
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);

    if (error) throw error;

    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    return updatedTasks;
  } catch (error) {
    console.error('Error updating task status:', error);
    return tasks;
  }
};