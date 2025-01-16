import React, { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import AdvancedBlogView from '@/components/blog/AdvancedBlogView';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

const Blog = () => {
  const { toast } = useToast();
  const sessionId = uuidv4(); // Generate unique session ID

  useEffect(() => {
    const logPageView = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        console.log('Logging blog page view');
        
        // Create a serializable object with only the necessary data
        const clientInfo = {
          timestamp: new Date().toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          screen: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          userAgent: navigator.userAgent,
          language: navigator.language
        };

        const details = {
          path: window.location.pathname,
          referrer: document.referrer || null
        };

        const { error } = await supabase
          .from('interaction_logs')
          .insert({
            profile_id: user?.id || null,
            interaction_type: 'page_view',
            component_name: 'Blog',
            details,
            metadata: {
              userAgent: navigator.userAgent,
              language: navigator.language,
              screenSize: {
                width: window.innerWidth,
                height: window.innerHeight
              }
            },
            session_id: sessionId,
            client_info: clientInfo
          });

        if (error) {
          console.error('Error logging page view:', error);
          toast({
            variant: "destructive",
            title: "Error logging interaction",
            description: "Your activity couldn't be recorded, but the page will work normally.",
          });
        }
      } catch (error) {
        console.error('Error in logPageView:', error);
      }
    };

    logPageView();
  }, [sessionId, toast]);

  return (
    <div className="min-h-screen bg-[#F6F6F7]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-normal text-[#8E9196] mb-8 tracking-tight">
          Blog & Insights
        </h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <AdvancedBlogView />
        </div>
      </div>
    </div>
  );
};

export default Blog;