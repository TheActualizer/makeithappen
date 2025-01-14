import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message, MessageType } from '@/types/message';

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

interface MessageWithProfile extends Message {
  profiles: ProfileData | null;
}

export const useMessages = (conversationId: string) => {
  const [messages, setMessages] = useState<MessageWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log('Fetching messages for conversation:', conversationId);
        
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select(`
            *,
            profiles (
              first_name,
              last_name,
              email,
              avatar_url
            )
          `)
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true });

        if (messagesError) {
          console.error('Error fetching messages:', messagesError);
          setError(messagesError.message);
          return;
        }

        console.log('Fetched messages:', messagesData);

        const typedMessages = messagesData?.map(msg => ({
          id: msg.id,
          content: msg.content,
          sender_id: msg.sender_id,
          is_admin_message: msg.is_admin_message || false,
          created_at: msg.created_at,
          conversation_id: msg.conversation_id,
          type: msg.type as MessageType || 'text',
          profiles: msg.profiles as ProfileData | null
        })) || [];

        setMessages(typedMessages);
      } catch (err) {
        console.error('Error in fetchMessages:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  return { messages, loading, error };
};

export default useMessages;