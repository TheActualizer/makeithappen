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
      console.log('Chat interface opened, creating new conversation...');
      createNewConversation();
    }
  }, [isOpen]);

  useEffect(() => {
    if (conversationId) {
      console.log(`Setting up real-time subscription for conversation ${conversationId}`);
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
            console.log('New message received:', payload);
            const newMessage = payload.new as Message;
            setMessages((prev) => [...prev, newMessage]);
          }
        )
        .subscribe();

      return () => {
        console.log('Cleaning up real-time subscription');
        supabase.removeChannel(channel);
      };
    }
  }, [conversationId]);

  const createNewConversation = async () => {
    try {
      console.log('Creating new conversation with provider:', selectedModel);
      
      const { data, error } = await supabase
        .from('conversations')
        .insert([{ 
          title: 'New Chat',
          provider: selectedModel === 'dify' ? 'dify' : 'openai'
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating conversation:', error);
        throw error;
      }
      
      console.log('Conversation created successfully:', data);
      setConversationId(data.id);

      // Create initial system message
      const { error: messageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: data.id,
            content: "Hello! I'm your AI assistant. How can I help you today?",
            type: 'system',
          },
        ]);

      if (messageError) {
        console.error('Error creating initial message:', messageError);
        throw messageError;
      }

      console.log('Initial system message created successfully');
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
    if (!newMessage.trim() || !conversationId || isLoading) {
      console.log('Message send prevented:', { 
        hasContent: !!newMessage.trim(), 
        hasConversationId: !!conversationId, 
        isLoading 
      });
      return;
    }

    const messageContent = newMessage;
    setNewMessage('');
    setIsLoading(true);
    console.log('Sending message:', { content: messageContent, conversationId });

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Insert user message
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

      if (messageError) {
        console.error('Error inserting user message:', messageError);
        throw messageError;
      }

      // Call AI service
      console.log('User message saved, calling AI service...');
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message: messageContent,
          model: selectedModel,
          conversationId,
        },
      });

      if (error) {
        console.error('Error from chat function:', error);
        throw error;
      }

      console.log('Received AI response:', data);

      if (!data.answer) {
        throw new Error('No answer received from AI');
      }

      // Insert AI response
      const { error: aiMessageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: conversationId,
            content: data.answer,
            type: 'ai',
          },
        ]);

      if (aiMessageError) {
        console.error('Error saving AI response:', aiMessageError);
        throw aiMessageError;
      }

      console.log('AI response saved successfully');
    } catch (error) {
      console.error('Error in sendMessage:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = (open: boolean) => {
    console.log('Chat interface visibility changed:', open);
    setIsOpen(open);
    if (open && !conversationId) {
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