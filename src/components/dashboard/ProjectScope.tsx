import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/toast";
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
  complexity: string | null;
  workforce_simulation_scope: string | null;
  ai_agent_requirements: string[] | null;
  pain_points: string[] | null;
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

        const { data, error } = await supabase
          .from("projects")
          .select("name, email, phone, company, project_type, description, timeline, budget_range, team_size, complexity, workforce_simulation_scope, ai_agent_requirements, pain_points")
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

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <Card key={index} className="p-6">
          <div className="space-y-6">
            <section className="space-y-2">
              <h3 className="text-lg font-semibold">{project.name}</h3>
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