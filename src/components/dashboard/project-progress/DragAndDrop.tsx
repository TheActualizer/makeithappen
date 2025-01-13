import { Task } from "@/types/project";

export const handleDragEnd = async (result: any, tasks: Task[]) => {
  if (!result.destination) return;

  const { source, destination } = result;
  const taskId = result.draggableId;
  const newStatus = destination.droppableId;

  // Update task status in the database
  try {
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);

    if (error) throw error;

    // Update local state
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    return updatedTasks;
  } catch (error) {
    console.error('Error updating task status:', error);
    return tasks;
  }
};