import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { ConversationList } from './messages/ConversationList';
import { MessageArea } from './messages/MessageArea';

interface Message {
  id: string;
  content: string;
  sender_id: string | null;
  created_at: string;
  conversation_id?: string;
  type?: 'text' | 'system' | 'ai';
  is_admin_message?: boolean;
  profiles?: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    avatar_url: string | null;
  } | null;
}

interface Conversation {
  id: string;
  title: string;
  created_at: string;
}

export const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin } = useIsAdmin();
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
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      console.log('Messages fetched:', data);
      setMessages(data || []);
    } catch (error) {
      console.error('Error in fetchMessages:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load messages",
      });
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || isLoading) {
      return;
    }

    setIsLoading(true);
    const messageContent = newMessage;
    setNewMessage('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Not authenticated');
      }

      const { error: messageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: selectedConversation,
            content: messageContent,
            sender_id: user.id,
            is_admin_message: isAdmin
          },
        ]);

      if (messageError) {
        throw messageError;
      }

      const { error: notifyError } = await supabase.functions.invoke('notify-admin', {
        body: {
          message: messageContent,
          userId: user.id,
          conversationId: selectedConversation,
        },
      });

      if (notifyError) {
        console.error('Error notifying admin:', notifyError);
      }

      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error in sendMessage:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message",
      });
      setNewMessage(messageContent);
    } finally {
      setIsLoading(false);
    }
  };

  const selectConversation = (conversationId: string) => {
    console.log('Selecting conversation:', conversationId);
    setSelectedConversation(conversationId);
    fetchMessages(conversationId);
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] gap-4">
      <ConversationList
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={selectConversation}
      />
      <MessageArea
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onSendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};