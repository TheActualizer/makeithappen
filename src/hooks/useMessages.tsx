import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Message, MessageWithProfile, ConversationType } from '@/types/message';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useMessages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Optimized conversations query
  const { 
    data: conversations = [], 
    isLoading: conversationsLoading,
    error: conversationsError 
  } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      console.log('useMessages: Fetching conversations');
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data.filter(conv => 
        conv.provider === 'dify' || conv.provider === 'openai'
      ) as ConversationType[];
    },
    staleTime: 1000 * 60 * 5, // Stay fresh for 5 minutes
  });

  // Optimized messages query with real-time updates
  const { 
    data: messages = [],
    isLoading: messagesLoading,
    error: messagesError
  } = useQuery({
    queryKey: ['messages', selectedConversation],
    queryFn: async () => {
      if (!selectedConversation) return [];
      
      console.log('useMessages: Fetching messages for conversation:', selectedConversation);
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
        .eq('conversation_id', selectedConversation)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      return messagesData.map((message: any) => ({
        ...message,
        profile: message.profiles
      })) as MessageWithProfile[];
    },
    enabled: !!selectedConversation,
  });

  // Set up real-time subscription
  useEffect(() => {
    if (!selectedConversation) return;

    console.log('useMessages: Setting up real-time subscription');
    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${selectedConversation}`
        },
        (payload) => {
          console.log('useMessages: Received real-time update:', payload);
          queryClient.invalidateQueries({ queryKey: ['messages', selectedConversation] });
        }
      )
      .subscribe();

    return () => {
      console.log('useMessages: Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [selectedConversation, queryClient]);

  const error = useMemo(() => 
    conversationsError || messagesError, 
    [conversationsError, messagesError]
  );

  const loading = useMemo(() => 
    conversationsLoading || messagesLoading, 
    [conversationsLoading, messagesLoading]
  );

  return {
    messages,
    conversations,
    selectedConversation,
    setSelectedConversation,
    loading,
    error
  };
}