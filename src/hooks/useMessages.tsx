import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Message, MessageWithProfile, ConversationType } from '@/types/message';

export function useMessages() {
  const [messages, setMessages] = useState<MessageWithProfile[]>([]);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Filter out unsupported providers to match ConversationType
      const filteredData = data.filter(conv => 
        conv.provider === 'dify' || conv.provider === 'openai'
      ) as ConversationType[];
      
      setConversations(filteredData);
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError('Failed to load conversations');
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      setLoading(true);
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select(`
          *,
          profiles (
            id,
            first_name,
            last_name,
            email,
            avatar_url,
            role
          )
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      const messagesWithProfiles = messagesData.map((message: any) => ({
        ...message,
        profile: message.profiles
      })) as MessageWithProfile[];

      setMessages(messagesWithProfiles);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
    }
  }, [selectedConversation]);

  return {
    messages,
    conversations,
    selectedConversation,
    setSelectedConversation,
    loading,
    error,
    fetchMessages
  };
}