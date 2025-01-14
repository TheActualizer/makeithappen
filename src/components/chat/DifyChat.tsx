import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    DifyChat: {
      init: (config: any) => void;
      updateToken: (token: string) => void;
    };
  }
}

const DifyChat = () => {
  useEffect(() => {
    const initializeDifyChat = async () => {
      try {
        console.log('DifyChat: Initializing chat widget');
        const { data: { session } } = await supabase.auth.getSession();
        
        // Fetch Dify API key from Supabase Edge Function
        const { data, error } = await supabase.functions.invoke('get-secret', {
          body: { key: 'DIFY_API_KEY' }
        });

        if (error) {
          console.error('DifyChat: Error fetching API key:', error);
          return;
        }

        if (data?.value && window.DifyChat?.updateToken) {
          console.log('DifyChat: Updating token');
          window.DifyChat.updateToken(data.value);
        }
      } catch (error) {
        console.error('DifyChat: Error initializing chat:', error);
      }
    };

    initializeDifyChat();
  }, []);

  return (
    <div id="dify-chat-container" className="fixed bottom-5 right-5 z-50">
      {/* Dify chat will be mounted here */}
    </div>
  );
};

export default DifyChat;