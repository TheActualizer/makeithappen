import { LucideIcon } from "lucide-react";
import {
  Building,
  Globe,
  Server,
  Database,
  Users,
  Link,
  Wifi,
  House,
  Infinity,
} from "lucide-react";

export type PageCategory = {
  name: string;
  description: string;
  icon: LucideIcon;
  pages: PageInfo[];
};

export type PageInfo = {
  title: string;
  path: string;
  description: string;
  isProtected: boolean;
  category: string;
  tags?: string[];
};

export const siteMapCategories: PageCategory[] = [
  {
    name: "Enterprise Solutions",
    description: "Enterprise-grade business solutions and integrations",
    icon: Building,
    pages: [
      {
        title: "Digital Transformation",
        path: "/enterprise/digital-transformation",
        description: "Complete digital transformation solutions",
        isProtected: true,
        category: "enterprise",
      },
      {
        title: "Workflow Automation",
        path: "/enterprise/workflow-automation",
        description: "Enterprise workflow automation",
        isProtected: true,
        category: "enterprise",
      },
      // ... Add more enterprise pages
    ],
  },
  {
    name: "Infrastructure",
    description: "Core infrastructure and system architecture",
    icon: Server,
    pages: [
      {
        title: "Cloud Architecture",
        path: "/infrastructure/cloud",
        description: "Cloud infrastructure solutions",
        isProtected: true,
        category: "infrastructure",
      },
      // ... Add more infrastructure pages
    ],
  },
  {
    name: "Technology Hub",
    description: "Advanced technology implementations",
    icon: Database,
    pages: [
      {
        title: "AI Integration",
        path: "/technology/ai-integration",
        description: "AI and ML solutions",
        isProtected: true,
        category: "technology",
      },
      // ... Add more technology pages
    ],
  },
];

export const getAllPages = (): PageInfo[] => {
  return siteMapCategories.reduce((acc, category) => {
    return [...acc, ...category.pages];
  }, [] as PageInfo[]);
};

export const getProtectedPages = (): PageInfo[] => {
  return getAllPages().filter(page => page.isProtected);
};

export const getPagesByCategory = (category: string): PageInfo[] => {
  return getAllPages().filter(page => page.category === category);
};