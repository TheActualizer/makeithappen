import React, { useState, useEffect, useRef } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ChatButton from './ChatButton';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

type Message = {
  id: string;
  content: string;
  type: 'text' | 'system' | 'ai';
  sender_id: string | null;
  created_at: string;
};

type AIModel = 'gpt-4o-mini' | 'gpt-4o' | 'claude' | 'gemini' | 'dify';

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState<AIModel>('dify');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !conversationId) {
      createNewConversation();
    }
  }, [isOpen]);

  useEffect(() => {
    if (conversationId) {
      const channel = supabase
        .channel('chat-updates')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${conversationId}`,
          },
          (payload) => {
            const newMessage = payload.new as Message;
            setMessages((prev) => [...prev, newMessage]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [conversationId]);

  const createNewConversation = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert([{ 
          title: 'New Chat',
          provider: selectedModel === 'dify' ? 'dify' : 'openai'
        }])
        .select()
        .single();

      if (error) throw error;
      setConversationId(data.id);

      await supabase.from('messages').insert([
        {
          conversation_id: data.id,
          content: "Hello! I'm your AI assistant. How can I help you today?",
          type: 'system',
        },
      ]);
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "Error",
        description: "Failed to start a new conversation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId || isLoading) return;

    setIsLoading(true);
    const messageContent = newMessage;
    setNewMessage('');

    try {
      await supabase
        .from('messages')
        .insert([
          {
            conversation_id: conversationId,
            content: messageContent,
            type: 'text',
          },
        ]);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          model: selectedModel,
          conversationId,
        }),
      });

      if (!response.ok) throw new Error('Failed to get AI response');

      const { answer } = await response.json();

      await supabase
        .from('messages')
        .insert([
          {
            conversation_id: conversationId,
            content: answer,
            type: 'ai',
          },
        ]);

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <ChatButton />
      <SheetContent className="w-[400px] sm:w-[540px] h-full flex flex-col p-0">
        <ChatHeader selectedModel={selectedModel} onModelChange={setSelectedModel} />
        <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />
        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSubmit={sendMessage}
          isLoading={isLoading}
        />
      </SheetContent>
    </Sheet>
  );
};

export default ChatInterface;