import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Users, Calendar, MessageSquare } from "lucide-react";

interface DashboardStatsProps {
  isAdmin?: boolean;
}

export const DashboardStats = ({ isAdmin }: DashboardStatsProps) => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats", isAdmin],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const [projects, contacts, profiles] = await Promise.all([
        isAdmin
          ? supabase.from("projects").select("count")
          : supabase
              .from("projects")
              .select("count")
              .eq("user_id", user?.id),
        isAdmin
          ? supabase.from("contact_submissions").select("count")
          : supabase
              .from("contact_submissions")
              .select("count")
              .eq("email", user?.email),
        isAdmin
          ? supabase.from("profiles").select("count")
          : { count: null },
      ]);

      return {
        totalProjects: projects.count || 0,
        totalContacts: contacts.count || 0,
        totalUsers: profiles.count || 0,
      };
    },
  });

  const statCards = [
    {
      title: isAdmin ? "Total Projects" : "My Projects",
      value: stats?.totalProjects || 0,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: isAdmin ? "Contact Forms" : "My Forms",
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
      title: isAdmin ? "Total Users" : "Active Users",
      value: isAdmin ? stats?.totalUsers || 0 : "Coming soon",
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