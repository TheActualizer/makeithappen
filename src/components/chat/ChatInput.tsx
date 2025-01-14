import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { useMessageSender } from '@/hooks/useMessageSender';

const ChatInput = () => {
  const { newMessage, setNewMessage, sendMessage } = useMessageSender();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <Textarea
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Message..."
      className="min-h-[60px] w-full pr-20 bg-accent/50 border-secondary/20 focus:ring-primary/50 resize-none"
    />
  );
};

export default ChatInput;