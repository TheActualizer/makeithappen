import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Calendar,
  FileText,
  MessageSquare,
  Target,
  Wallet
} from "lucide-react";

interface DashboardSectionsProps {
  project: any; // You can replace 'any' with your project type
}

export const DashboardSections = ({ project }: DashboardSectionsProps) => {
  const sections = [
    {
      title: "Progress",
      description: "Track project milestones and completion",
      icon: BarChart3,
      href: "/dashboard/progress",
    },
    {
      title: "Documents",
      description: "Access project files and documentation",
      icon: FileText,
      href: "/dashboard/documents",
    },
    {
      title: "Calendar",
      description: "View project timeline and meetings",
      icon: Calendar,
      href: "/dashboard/calendar",
    },
    {
      title: "Messages",
      description: "Communication and updates",
      icon: MessageSquare,
      href: "/dashboard/messages",
    },
    {
      title: "Scope",
      description: "Project requirements and deliverables",
      icon: Target,
      href: "/dashboard/scope",
    },
    {
      title: "Financials",
      description: "Budget tracking and payments",
      icon: Wallet,
      href: "/dashboard/financials",
    },
  ];

  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-semibold">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.title} to={section.href}>
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-center gap-2 hover:bg-accent/5"
              >
                <Icon className="h-6 w-6 text-primary" />
                <div className="text-left w-full">
                  <h3 className="font-medium">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};