import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const CaseStudies = () => {
  const navigate = useNavigate();

  // Fetch portal metrics for the current user
  const { data: portalMetrics, isLoading } = useQuery({
    queryKey: ['portalMetrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portal_metrics')
        .select('*')
        .single();
      
      if (error) {
        console.error('Error fetching portal metrics:', error);
        return null;
      }
      return data;
    }
  });

  const portalHubs = [
    {
      title: "Enterprise Hub",
      description: "Connect with enterprise-level solutions and workflows",
      threadsCount: portalMetrics?.threads_connected || 0,
      level: portalMetrics?.current_level || 1,
    },
    {
      title: "Infrastructure Hub",
      description: "Explore system architecture and technical foundations",
      threadsCount: 0,
      level: 0,
      locked: true,
    },
    {
      title: "Technology Hub",
      description: "Discover cutting-edge tech implementations",
      threadsCount: 0,
      level: 0,
      locked: true,
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Portal Hub
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Connect threads, build knowledge, evolve systems
        </p>
      </motion.div>

      {/* User Stats */}
      <div className="bg-accent/5 rounded-xl p-6 mb-8 backdrop-blur-sm border border-secondary/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Threads Connected</h3>
            <p className="text-3xl font-bold text-primary">{portalMetrics?.threads_connected || 0}</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Current Level</h3>
            <p className="text-3xl font-bold text-secondary">{portalMetrics?.current_level || 1}</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Points Earned</h3>
            <p className="text-3xl font-bold text-primary">{portalMetrics?.points_earned || 0}</p>
          </div>
        </div>
      </div>

      {/* Portal Hubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portalHubs.map((hub, index) => (
          <motion.div
            key={hub.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`p-6 h-full backdrop-blur-sm border-2 transition-all duration-300 ${
              hub.locked 
                ? 'border-gray-300/20 opacity-50' 
                : 'border-secondary/20 hover:border-secondary/40 hover:shadow-lg hover:shadow-secondary/5'
            }`}>
              <h3 className="text-xl font-semibold mb-3">{hub.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{hub.description}</p>
              
              <div className="flex justify-between items-center mt-auto">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{hub.threadsCount}</span> threads
                </div>
                <Button
                  variant={hub.locked ? "outline" : "default"}
                  disabled={hub.locked}
                  onClick={() => navigate(`/portal/${hub.title.toLowerCase().replace(' ', '-')}`)}
                  className={hub.locked ? 'opacity-50' : 'bg-gradient-to-r from-secondary to-primary'}
                >
                  {hub.locked ? 'Locked' : 'Enter Hub'}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;