import React, { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Link2, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendMessageToDify } from '@/utils/difyApi';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

const ChatInput = () => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [conversationId] = useState(() => uuidv4());

  useEffect(() => {
    const createConversation = async () => {
      console.log('ChatInput: Creating new conversation');
      const { data: existingConv, error: checkError } = await supabase
        .from('conversations')
        .select('id')
        .eq('id', conversationId)
        .maybeSingle();  // Changed from .single() to .maybeSingle()

      if (!existingConv) {
        console.log('ChatInput: No existing conversation found, creating new one...');
        const { error: createError } = await supabase
          .from('conversations')
          .insert([
            {
              id: conversationId,
              title: 'New Conversation',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              provider: 'dify'
            }
          ]);

        if (createError) {
          console.error('ChatInput: Error creating conversation:', createError);
          return;
        }
        console.log('ChatInput: Conversation created successfully with ID:', conversationId);
      }
    };

    createConversation();
  }, [conversationId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ChatInput: Send message triggered', { newMessage, isLoading, conversationId });
    
    if (!newMessage.trim() || isLoading) {
      console.log('ChatInput: Send prevented - empty message or loading');
      return;
    }

    setIsLoading(true);
    const messageContent = newMessage.trim();
    const timestamp = new Date().toISOString();
    
    try {
      // Clear input immediately for better UX
      setNewMessage('');
      
      console.log('ChatInput: Storing user message in Supabase');
      const { data: messageData, error: messageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: conversationId,
            content: messageContent,
            type: 'text',
            is_admin_message: false,
            created_at: timestamp,
            updated_at: timestamp
          }
        ])
        .select()
        .single();

      if (messageError) {
        console.error('ChatInput: Error storing message:', messageError);
        throw messageError;
      }

      console.log('ChatInput: Message stored successfully:', messageData);

      console.log('ChatInput: Sending message to Dify');
      const difyResponse = await sendMessageToDify(messageContent, conversationId);
      console.log('ChatInput: Dify response received:', difyResponse);

      // Store AI response
      if (difyResponse.answer) {
        const aiTimestamp = new Date().toISOString();
        console.log('ChatInput: Storing AI response in Supabase');
        const { error: aiError } = await supabase
          .from('messages')
          .insert([
            {
              conversation_id: conversationId,
              content: difyResponse.answer,
              type: 'ai',
              is_admin_message: true,
              created_at: aiTimestamp,
              updated_at: aiTimestamp
            }
          ]);

        if (aiError) {
          console.error('ChatInput: Error storing AI response:', aiError);
          throw aiError;
        }
        
        console.log('ChatInput: AI response stored successfully');
      }

      toast({
        title: "Message sent",
        description: "Your message has been processed.",
      });

    } catch (error) {
      console.error('ChatInput: Error in send message flow:', error);
      // Only restore message on error
      setNewMessage(messageContent);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="relative">
      <Textarea
        value={newMessage}
        onChange={(e) => {
          console.log('ChatInput: Input changed:', e.target.value);
          setNewMessage(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        className="min-h-[60px] w-full pr-20 bg-white/5 border-white/10 focus:ring-purple-400/30 resize-none rounded-lg placeholder-purple-200/40 text-purple-100"
      />
      <div className="absolute right-2 bottom-2 flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-8 h-8 hover:bg-white/10 text-purple-200/80 transition-colors duration-300"
        >
          <Link2 className="w-4 h-4" />
        </Button>
        <Button 
          size="icon" 
          className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border border-purple-400/20 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;