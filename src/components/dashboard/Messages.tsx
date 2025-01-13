import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { ConversationList } from './messages/ConversationList';
import { MessageArea } from './messages/MessageArea';
import { MonitoringPanel } from './monitoring/MonitoringPanel';

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
        console.error('Error fetching messages:', error);
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
    console.log('Send message triggered with:', { 
      newMessage, 
      selectedConversation, 
      isLoading 
    });

    if (!newMessage.trim() || !selectedConversation || isLoading) {
      console.log('Message send prevented:', {
        hasContent: !!newMessage.trim(),
        hasConversation: !!selectedConversation,
        isLoading
      });
      return;
    }

    const messageContent = newMessage.trim();
    console.log('Message content prepared:', messageContent);
    
    setIsLoading(true);
    setNewMessage(''); // Clear input immediately for better UX

    try {
      console.log('Getting current user...');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No authenticated user found');
        throw new Error('Not authenticated');
      }
      console.log('Current user:', user);

      console.log('Inserting message into database...');
      const { error: messageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: selectedConversation,
            content: messageContent,
            sender_id: user.id,
            type: 'text',
            is_admin_message: isAdmin
          },
        ]);

      if (messageError) {
        console.error('Error inserting message:', messageError);
        setNewMessage(messageContent); // Restore message if sending failed
        throw messageError;
      }

      console.log('Message inserted successfully, notifying admin...');
      const { error: notifyError } = await supabase.functions.invoke('notify-admin', {
        body: {
          message: messageContent,
          userId: user.id,
          conversationId: selectedConversation,
        },
      });

      if (notifyError) {
        console.error('Error notifying admin:', notifyError);
        // Don't throw here as the message was already sent successfully
      }

      console.log('Message sent and admin notified successfully');
      
      // Fetch messages again to ensure we have the latest state
      await fetchMessages(selectedConversation);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message",
      });
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
    <div className="space-y-6">
      {isAdmin && <MonitoringPanel />}
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
    </div>
  );
};