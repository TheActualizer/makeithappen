import React, { useState, useEffect, useRef } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen && !conversationId && isAuthenticated) {
      createNewConversation();
    }
  }, [isOpen, isAuthenticated]);

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
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to start a conversation.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    try {
      console.log('Creating new conversation...');
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('conversations')
        .insert([{ 
          title: 'New Chat',
          provider: selectedModel === 'dify' ? 'dify' : 'openai',
          created_by: user?.id
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating conversation:', error);
        throw error;
      }
      
      console.log('Conversation created:', data);
      setConversationId(data.id);

      const { error: messageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: data.id,
            content: "Hello! I'm your AI assistant. How can I help you today?",
            type: 'system',
          },
        ]);

      if (messageError) throw messageError;
    } catch (error) {
      console.error('Error in createNewConversation:', error);
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
      console.log('Sending message:', messageContent);
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error: messageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: conversationId,
            content: messageContent,
            type: 'text',
            sender_id: user?.id
          },
        ]);

      if (messageError) throw messageError;

      console.log('Calling chat API...');
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
      console.log('Received AI response:', answer);

      const { error: aiMessageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: conversationId,
            content: answer,
            type: 'ai',
          },
        ]);

      if (aiMessageError) throw aiMessageError;

    } catch (error) {
      console.error('Error in sendMessage:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setNewMessage(messageContent); // Restore the message if it failed to send
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    if (open && !conversationId && isAuthenticated) {
      createNewConversation();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpen}>
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