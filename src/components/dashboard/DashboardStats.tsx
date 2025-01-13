import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Users, Calendar, MessageSquare } from "lucide-react";

export const DashboardStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [projects, contacts] = await Promise.all([
        supabase.from("projects").select("count"),
        supabase.from("contact_submissions").select("count"),
      ]);

      return {
        totalProjects: projects.count || 0,
        totalContacts: contacts.count || 0,
      };
    },
  });

  const statCards = [
    {
      title: "Total Projects",
      value: stats?.totalProjects || 0,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Contact Forms",
      value: stats?.totalContacts || 0,
      icon: MessageSquare,
      color: "text-green-500",
    },
    {
      title: "Calendar Events",
      value: "Coming soon",
      icon: Calendar,
      color: "text-purple-500",
    },
    {
      title: "Active Users",
      value: "Coming soon",
      icon: Users,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold mt-2">
                {isLoading ? "Loading..." : stat.value}
              </h3>
            </div>
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
          </div>
        </Card>
      ))}
    </div>
  );
};