import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardActivity } from "@/components/dashboard/DashboardActivity";
import { DashboardSections } from "@/components/dashboard/DashboardSections";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);

  useEffect(() => {
    checkUser();
    fetchProject();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Please try logging in again."
      });
      navigate('/login');
    }
  };

  const fetchProject = async () => {
    try {
      console.log('Fetching project data...');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        console.log('No authenticated user found');
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (projectError && projectError.code !== 'PGRST116') {
        throw projectError;
      }

      console.log('Project data:', project);
      setProject(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load project data. Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <DashboardStats project={project} />
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <DashboardActivity />
            </Card>
            <Card className="p-6">
              <DashboardSections project={project} />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;