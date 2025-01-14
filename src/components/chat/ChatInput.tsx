import React, { useRef, useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Link2, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendMessageToDify } from '@/utils/difyApi';
import { v4 as uuidv4 } from 'uuid';

const ChatInput = () => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [conversationId] = useState(() => uuidv4());

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || isLoading) {
      console.log('Message send prevented:', {
        hasContent: !!newMessage.trim(),
        isLoading
      });
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Sending message:', {
        content: newMessage,
        conversationId
      });

      const userMessage = {
        id: uuidv4(),
        content: newMessage,
        type: 'text' as const,
        sender_id: null,
        created_at: new Date().toISOString()
      };

      // Add user message to chat
      const response = await sendMessageToDify(newMessage, conversationId);
      
      console.log('Dify response:', response);

      // Clear input after successful send
      setNewMessage('');
      
      toast({
        title: "Message sent",
        description: "Your message has been processed by the AI.",
      });

    } catch (error) {
      console.error('Error sending message:', error);
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
          console.log('Message input changed:', e.target.value);
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