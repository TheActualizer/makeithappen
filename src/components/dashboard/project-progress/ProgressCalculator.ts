import { Milestone, Sprint } from "@/types/project";

export const calculateProgress = (items: Milestone[] | Sprint[]) => {
  if (!items || items.length === 0) return 0;
  
  const completed = items.filter(item => 
    item.status === 'completed' || item.status === 'done'
  ).length;
  
  return Math.round((completed / items.length) * 100);
};