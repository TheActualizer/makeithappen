import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Network, Zap, Brain, Workflow } from "lucide-react";
import { motion } from "framer-motion";

const ThreadPortal = () => {
  // Fetch active threads and connections
  const { data: threads, isLoading } = useQuery({
    queryKey: ['active-threads'],
    queryFn: async () => {
      console.log('Fetching active threads...');
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          messages (
            content,
            type,
            created_at
          )
        `)
        .eq('is_archived', false)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching threads:', error);
        throw error;
      }

      console.log('Threads fetched:', data);
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-background">
      <Navbar />
      
      {/* Portal Header */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:32px_32px] opacity-25" />
        <div className="container px-4 mx-auto relative">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <Network className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-medium text-primary">Agentic Portal v0.1</h2>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              Thread Connection Hub
            </motion.h1>
          </div>

          {/* Active Threads Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : threads?.map((thread, index) => (
              <motion.div
                key={thread.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-accent/40 backdrop-blur-sm border-accent/20 overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-500">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {thread.provider === 'dify' ? (
                        <Brain className="w-5 h-5 text-primary" />
                      ) : (
                        <Workflow className="w-5 h-5 text-secondary" />
                      )}
                      <h3 className="text-lg font-semibold text-white">
                        {thread.title || 'New Thread'}
                      </h3>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-300">
                        {thread.messages?.[0]?.content?.slice(0, 120)}...
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-accent/50">
                          {thread.provider}
                        </Badge>
                        <Badge variant="outline" className="bg-accent/50">
                          {thread.messages?.length || 0} messages
                        </Badge>
                      </div>
                    </div>

                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="w-full mt-4"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Connect Thread
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThreadPortal;