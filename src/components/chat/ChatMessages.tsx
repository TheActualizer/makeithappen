import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import type { Message } from '@/types/message';
import { supabase } from '@/integrations/supabase/client';

const ChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    console.log('ChatMessages: Component mounted');
    fetchMessages();
    subscribeToMessages();
  }, []);

  const fetchMessages = async () => {
    console.log('ChatMessages: Fetching messages from Supabase');
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        profiles:sender_id (
          first_name,
          last_name,
          email,
          avatar_url
        )
      `)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('ChatMessages: Error fetching messages:', error);
      return;
    }

    console.log('ChatMessages: Successfully fetched messages:', data);
    setMessages(data as Message[]);
  };

  const subscribeToMessages = () => {
    console.log('ChatMessages: Setting up real-time subscription');
    const subscription = supabase
      .channel('messages_channel')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'messages' 
        }, 
        (payload) => {
          console.log('ChatMessages: Received real-time update:', payload);
          fetchMessages();
        }
      )
      .subscribe((status) => {
        console.log('ChatMessages: Subscription status:', status);
      });

    return () => {
      console.log('ChatMessages: Cleaning up subscription');
      subscription.unsubscribe();
    };
  };

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;