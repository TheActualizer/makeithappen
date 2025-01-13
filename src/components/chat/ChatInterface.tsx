import React, { useState, useEffect, useRef } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  type: 'text' | 'system' | 'ai';
  sender_id: string | null;
  created_at: string;
};

type AIModel = 'gpt-4o-mini' | 'gpt-4o' | 'claude' | 'gemini';

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState<AIModel>('gpt-4o-mini');
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
        .insert([{ title: 'New Chat' }])
        .select()
        .single();

      if (error) throw error;
      setConversationId(data.id);

      // Add welcome message
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
      // Insert user message
      const { error: messageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: conversationId,
            content: messageContent,
            type: 'text',
          },
        ]);

      if (messageError) throw messageError;

      // Get AI response
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

      // Insert AI response
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
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50 hover:scale-110 transition-transform duration-200"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-[400px] sm:w-[540px] h-full flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center justify-between">
            <span>Chat Assistant</span>
            <Select value={selectedModel} onValueChange={(value: AIModel) => setSelectedModel(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select AI Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o-mini">GPT-4 Mini</SelectItem>
                <SelectItem value="gpt-4o">GPT-4</SelectItem>
                <SelectItem value="claude">Claude</SelectItem>
                <SelectItem value="gemini">Gemini</SelectItem>
              </SelectContent>
            </Select>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-3 text-sm",
                  message.type === 'text' ? "justify-end" : "justify-start"
                )}
              >
                {message.type === 'ai' && (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                {message.type === 'text' && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-[80%]",
                    message.type === 'text' ? "bg-primary text-primary-foreground" : "bg-muted",
                    message.type === 'system' ? "bg-accent text-accent-foreground w-full text-center" : ""
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form
          onSubmit={sendMessage}
          className="border-t p-4 flex gap-4 items-center"
        >
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ChatInterface;
