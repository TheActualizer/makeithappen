import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Badge } from "@/components/ui/badge";
import { Task } from "../../../types/project";

interface KanbanBoardProps {
  sprintId: string;
  tasks: Task[];
  onDragEnd: (result: any) => void;
}

const KANBAN_COLUMNS = [
  { id: 'backlog', title: 'Backlog', color: 'bg-gray-500' },
  { id: 'todo', title: 'To Do', color: 'bg-blue-500' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-yellow-500' },
  { id: 'review', title: 'Review', color: 'bg-purple-500' },
  { id: 'done', title: 'Done', color: 'bg-green-500' }
];

export function KanbanBoard({ sprintId, tasks, onDragEnd }: KanbanBoardProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
}