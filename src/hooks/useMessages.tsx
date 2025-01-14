import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Message {
  id: string;
  content: string;
  sender_id: string | null;
  created_at: string;
  conversation_id?: string;
  type: 'text' | 'system' | 'ai';
  profiles?: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    avatar_url: string | null;
  } | null;
}

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
          updated_at,
          profiles (
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
      // Ensure the data matches the Message interface
      const typedMessages: Message[] = data?.map(msg => ({
        id: msg.id,
        content: msg.content,
        sender_id: msg.sender_id,
        created_at: msg.created_at,
        conversation_id: msg.conversation_id,
        type: msg.type,
        profiles: msg.profiles
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