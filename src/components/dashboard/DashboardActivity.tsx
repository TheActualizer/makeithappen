import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export const DashboardActivity = () => {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["dashboard-activity"],
    queryFn: async () => {
      const [projects, contacts] = await Promise.all([
        supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      const combinedActivities = [
        ...(projects.data || []).map((p) => ({
          type: "project",
          title: `New project: ${p.name}`,
          date: p.created_at,
        })),
        ...(contacts.data || []).map((c) => ({
          type: "contact",
          title: `New contact form: ${c.name}`,
          date: c.created_at,
        })),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return combinedActivities.slice(0, 5);
    },
  });

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {isLoading ? (
          <p>Loading activities...</p>
        ) : (
          activities?.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <span>{activity.title}</span>
              <span className="text-sm text-muted-foreground">
                {new Date(activity.date).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};