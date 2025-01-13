import { Milestone, Sprint, Task } from "@/types/project";

export const calculateProgress = (items: Milestone[] | Sprint[] | Task[], statusField: string = 'status') => {
  if (!items || items.length === 0) return 0;
  
  const completedItems = items.filter(item => {
    const status = item[statusField as keyof typeof item];
    return status === 'completed' || status === 'done';
  });
  
  return Math.round((completedItems.length / items.length) * 100);
};