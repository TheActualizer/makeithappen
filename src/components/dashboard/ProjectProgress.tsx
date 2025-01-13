import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";

const ProjectProgress = () => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Project Setup",
      status: "completed"
    },
    {
      id: "2",
      title: "Requirements Gathering",
      status: "in_progress"
    },
    {
      id: "3",
      title: "Design Phase",
      status: "not_started"
    },
    {
      id: "4",
      title: "Development",
      status: "not_started"
    },
    {
      id: "5",
      title: "Testing",
      status: "not_started"
    }
  ]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setTasks(items);
  };

  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Project Progress</h2>
      <div className="mb-4">
        <div className="bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {calculateProgress()}% Complete
        </p>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-accent p-4 rounded-lg mb-2"
                    >
                      {task.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Card>
  );
};

export default ProjectProgress;