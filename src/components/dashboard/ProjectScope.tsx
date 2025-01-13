import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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
  actual_cost?: number;
  estimated_cost?: number;
  budget_spent?: number;
  budget_remaining?: number;
  advancement_status?: {
    requirements_completed: number;
    design_completed: number;
    development_completed: number;
    testing_completed: number;
    deployment_completed: number;
  };
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

  const getAdvancementColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };

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
            {/* Project Header */}
            <section className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <div className="flex gap-2">
                  {project.status && (
                    <Badge variant="secondary">
                      {project.status.replace('_', ' ')}
                    </Badge>
                  )}
                  {project.priority && (
                    <Badge variant={project.priority === 'high' ? 'destructive' : 'outline'}>
                      {project.priority}
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Project Advancements */}
              <div className="mt-4 space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Project Advancement</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Requirements</span>
                    <span>{project.advancement_status?.requirements_completed || 0}%</span>
                  </div>
                  <Progress 
                    value={project.advancement_status?.requirements_completed || 0} 
                    className="h-2"
                  />
                  
                  <div className="flex justify-between text-sm">
                    <span>Design</span>
                    <span>{project.advancement_status?.design_completed || 0}%</span>
                  </div>
                  <Progress 
                    value={project.advancement_status?.design_completed || 0} 
                    className="h-2"
                  />
                  
                  <div className="flex justify-between text-sm">
                    <span>Development</span>
                    <span>{project.advancement_status?.development_completed || 0}%</span>
                  </div>
                  <Progress 
                    value={project.advancement_status?.development_completed || 0} 
                    className="h-2"
                  />
                  
                  <div className="flex justify-between text-sm">
                    <span>Testing</span>
                    <span>{project.advancement_status?.testing_completed || 0}%</span>
                  </div>
                  <Progress 
                    value={project.advancement_status?.testing_completed || 0} 
                    className="h-2"
                  />
                  
                  <div className="flex justify-between text-sm">
                    <span>Deployment</span>
                    <span>{project.advancement_status?.deployment_completed || 0}%</span>
                  </div>
                  <Progress 
                    value={project.advancement_status?.deployment_completed || 0} 
                    className="h-2"
                  />
                </div>
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
