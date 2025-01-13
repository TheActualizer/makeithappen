import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Send, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender_id: string | null;
  created_at: string;
  conversation_id: string;
  profiles?: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  } | null;
}

interface Conversation {
  id: string;
  title: string;
  created_by: string;
  created_at: string;
}

export const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const { isAdmin } = useIsAdmin();
  const { toast } = useToast();

  useEffect(() => {
    fetchConversations();
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
          const newMessage = payload.new as Message;
          if (newMessage.conversation_id === selectedConversation) {
            setMessages(prev => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedConversation]);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          messages (
            sender_id,
            content,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
      if (data && data.length > 0 && !selectedConversation) {
        setSelectedConversation(data[0].id);
        fetchMessages(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load conversations",
      });
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          profiles:sender_id (
            first_name,
            last_name,
            email
          )
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load messages",
      });
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: selectedConversation,
            content: newMessage,
            sender_id: user.id,
          },
        ]);

      if (error) throw error;
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message",
      });
    }
  };

  const selectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    fetchMessages(conversationId);
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] gap-4">
      {/* Conversations List */}
      <Card className="w-1/4 p-4">
        <h3 className="font-semibold mb-4">Conversations</h3>
        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 rounded-lg cursor-pointer hover:bg-accent ${
                  selectedConversation === conversation.id ? 'bg-accent' : ''
                }`}
                onClick={() => selectConversation(conversation.id)}
              >
                <h4 className="font-medium">{conversation.title || 'Untitled Conversation'}</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(conversation.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Messages Area */}
      <Card className="flex-1 p-4 flex flex-col">
        <ScrollArea className="flex-1 mb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.profiles?.email === 'admin@example.com' ? 'justify-end' : ''
                }`}
              >
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">
                    {message.profiles?.first_name && message.profiles?.last_name
                      ? `${message.profiles.first_name} ${message.profiles.last_name}`
                      : 'Unknown User'}
                  </p>
                  <div className="bg-accent p-3 rounded-lg mt-1">
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={sendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
};