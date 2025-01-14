import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Message } from "@/types/message";

interface UseMessagesReturn {
  conversations: any[];
  messages: Message[];
  selectedConversation: string | null;
  setSelectedConversation: (id: string | null) => void;
  fetchMessages: (conversationId: string) => Promise<void>;
}

export const useMessages = (): UseMessagesReturn => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      console.log('Fetching conversations...');
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching conversations:', error);
        return;
      }

      console.log('Conversations fetched:', data);
      setConversations(data || []);
    } catch (error) {
      console.error('Error in fetchConversations:', error);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      console.log('Fetching messages for conversation:', conversationId);
      const { data, error } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          sender_id,
          created_at,
          conversation_id,
          type,
          is_admin_message,
          sender:profiles!messages_sender_id_fkey (
            first_name,
            last_name,
            email,
            avatar_url
          )
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      console.log('Messages fetched:', data);
      
      // Transform the data to match the Message interface
      const typedMessages: Message[] = data?.map(msg => ({
        id: msg.id,
        content: msg.content,
        sender_id: msg.sender_id,
        created_at: msg.created_at,
        conversation_id: msg.conversation_id,
        type: msg.type || 'text',
        profiles: msg.sender ? {
          first_name: msg.sender.first_name,
          last_name: msg.sender.last_name,
          email: msg.sender.email,
          avatar_url: msg.sender.avatar_url
        } : null
      })) || [];

      setMessages(typedMessages);
    } catch (error) {
      console.error('Error in fetchMessages:', error);
    }
  };

  return {
    conversations,
    messages,
    selectedConversation,
    setSelectedConversation,
    fetchMessages,
  };
};

export default useMessages;