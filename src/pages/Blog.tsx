import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import AdvancedBlogView from '@/components/blog/AdvancedBlogView';
import { v4 as uuidv4 } from 'uuid';
import { loggingService } from '@/services/loggingService';

const Blog = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const sessionId = uuidv4();

  useEffect(() => {
    let isSubscribed = true;

    const logView = async () => {
      try {
        setIsLoading(true);
        await loggingService.logPageView('Blog', sessionId, (error) => {
          if (isSubscribed) {
            toast({
              variant: "destructive",
              title: "Error logging interaction",
              description: "Your activity couldn't be recorded, but the page will work normally.",
            });
          }
        });
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    // Small delay to ensure component is properly mounted
    const timeoutId = setTimeout(logView, 100);

    return () => {
      isSubscribed = false;
      clearTimeout(timeoutId);
    };
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