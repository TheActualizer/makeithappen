import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Message, Conversation, Profile } from '@/types/message';

export const useMessages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log('Setting up real-time subscription for messages');
    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          console.log('New message received:', payload);
          const newMessage = payload.new as Message;
          if (newMessage.conversation_id === selectedConversation) {
            console.log('Adding new message to state:', newMessage);
            setMessages(prev => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up messages subscription');
      supabase.removeChannel(channel);
    };
  }, [selectedConversation]);

  useEffect(() => {
    console.log('Initial load - fetching conversations');
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    console.log('Fetching conversations...');
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('id, title, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching conversations:', error);
        throw error;
      }

      console.log('Conversations fetched:', data);
      setConversations(data || []);
      
      if (data && data.length > 0 && !selectedConversation) {
        console.log('Setting initial conversation:', data[0].id);
        setSelectedConversation(data[0].id);
        await fetchMessages(data[0].id);
      }
    } catch (error) {
      console.error('Error in fetchConversations:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load conversations",
      });
    }
  };

  const fetchMessages = async (conversationId: string) => {
    console.log('Fetching messages for conversation:', conversationId);
    try {
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          sender_id,
          created_at,
          conversation_id,
          type,
          profiles:sender_id (
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
        throw messagesError;
      }

      const typedMessages: Message[] = (messagesData || []).map(msg => ({
        id: msg.id,
        content: msg.content,
        sender_id: msg.sender_id,
        created_at: msg.created_at,
        conversation_id: msg.conversation_id,
        type: msg.type || 'text',
        profiles: msg.profiles ? {
          first_name: msg.profiles.first_name,
          last_name: msg.profiles.last_name,
          email: msg.profiles.email,
          avatar_url: msg.profiles.avatar_url
        } : null
      }));

      console.log('Messages fetched:', typedMessages);
      setMessages(typedMessages);
    } catch (error) {
      console.error('Error in fetchMessages:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load messages",
      });
    }
  };

  return {
    conversations,
    messages,
    selectedConversation,
    setSelectedConversation,
    fetchMessages,
    fetchConversations
  };
};