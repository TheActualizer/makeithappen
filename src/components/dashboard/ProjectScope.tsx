import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string[];
  description: string;
  timeline: string;
  budget_range: string | null;
  team_size: number | null;
  complexity: "simple" | "moderate" | "complex" | "enterprise" | null;
  workforce_simulation_scope: string | null;
  ai_agent_requirements: string[] | null;
  pain_points: string[] | null;
  status?: 'active' | 'completed' | 'on_hold' | 'planning';
  priority?: 'high' | 'medium' | 'low';
  last_updated?: string;
}

export const ProjectScope = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user?.email) return;

        console.log("Fetching projects for email:", userData.user.email);

        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("email", userData.user.email);

        if (error) throw error;
        
        console.log("Fetched projects:", data);
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast({
          title: "Error",
          description: "Failed to load project information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  if (loading) {
    return <Skeleton className="w-full h-48" />;
  }

  if (projects.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground">No project submissions found.</p>
      </Card>
    );
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'planning':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <Card key={index} className="p-6">
          <div className="space-y-6">
            <section className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <div className="flex gap-2">
                  {project.status && (
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  )}
                  {project.priority && (
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Email:</span> {project.email}
                </div>
                {project.phone && (
                  <div>
                    <span className="font-medium">Phone:</span> {project.phone}
                  </div>
                )}
                {project.company && (
                  <div>
                    <span className="font-medium">Company:</span> {project.company}
                  </div>
                )}
                {project.last_updated && (
                  <div>
                    <span className="font-medium">Last Updated:</span>{' '}
                    {new Date(project.last_updated).toLocaleDateString()}
                  </div>
                )}
              </div>
            </section>

            <section className="space-y-2">
              <h4 className="font-medium">Project Details</h4>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Project Types:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.project_type.map((type, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-primary/10 rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Timeline:</span> {project.timeline}
                </div>
                {project.budget_range && (
                  <div>
                    <span className="font-medium">Budget Range:</span>{" "}
                    {project.budget_range}
                  </div>
                )}
                {project.team_size && (
                  <div>
                    <span className="font-medium">Team Size:</span>{" "}
                    {project.team_size}
                  </div>
                )}
                {project.complexity && (
                  <div>
                    <span className="font-medium">Complexity:</span>{" "}
                    {project.complexity}
                  </div>
                )}
              </div>
            </section>

            <section className="space-y-2">
              <h4 className="font-medium">Project Description</h4>
              <p className="text-sm">{project.description}</p>
            </section>

            {project.workforce_simulation_scope && (
              <section className="space-y-2">
                <h4 className="font-medium">Digital Workforce Requirements</h4>
                <p className="text-sm">{project.workforce_simulation_scope}</p>
              </section>
            )}

            {project.ai_agent_requirements && project.ai_agent_requirements.length > 0 && (
              <section className="space-y-2">
                <h4 className="font-medium">AI Requirements</h4>
                <div className="flex flex-wrap gap-2">
                  {project.ai_agent_requirements.map((req, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-primary/10 rounded-full"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {project.pain_points && project.pain_points.length > 0 && (
              <section className="space-y-2">
                <h4 className="font-medium">Pain Points</h4>
                <div className="flex flex-wrap gap-2">
                  {project.pain_points.map((point, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-primary/10 rounded-full"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};