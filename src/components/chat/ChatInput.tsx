import React, { useState } from 'react';
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ChatInput: Send message triggered', { newMessage, isLoading });
    
    if (!newMessage.trim() || isLoading) {
      console.log('ChatInput: Send prevented - empty message or loading');
      return;
    }

    setIsLoading(true);
    const messageContent = newMessage.trim();
    
    try {
      console.log('ChatInput: Storing user message in Supabase');
      const { data: messageData, error: messageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: conversationId,
            content: messageContent,
            type: 'text',
            is_admin_message: false
          }
        ])
        .select()
        .single();

      if (messageError) {
        console.error('ChatInput: Error storing message:', messageError);
        throw messageError;
      }

      console.log('ChatInput: Message stored successfully:', messageData);
      setNewMessage(''); // Clear input after successful store

      console.log('ChatInput: Sending message to Dify');
      const difyResponse = await sendMessageToDify(messageContent, conversationId);
      console.log('ChatInput: Dify response received:', difyResponse);

      // Store AI response
      if (difyResponse.answer) {
        console.log('ChatInput: Storing AI response in Supabase');
        const { error: aiError } = await supabase
          .from('messages')
          .insert([
            {
              conversation_id: conversationId,
              content: difyResponse.answer,
              type: 'ai',
              is_admin_message: true
            }
          ]);

        if (aiError) {
          console.error('ChatInput: Error storing AI response:', aiError);
          throw aiError;
        }
      }

      toast({
        title: "Message sent",
        description: "Your message has been processed.",
      });

    } catch (error) {
      console.error('ChatInput: Error in send message flow:', error);
      setNewMessage(messageContent); // Restore message on error
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