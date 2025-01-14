import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { useMessageSender } from '@/hooks/useMessageSender';

const ChatInput = () => {
  const { newMessage, setNewMessage, sendMessage } = useMessageSender(null, () => {});

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
      placeholder="Ask me anything..."
      className="min-h-[60px] w-full pr-20 bg-purple-800/30 border-purple-300/20 focus:ring-purple-400/50 resize-none rounded-lg placeholder-purple-300/50 text-purple-100"
    />
  );
};

export default ChatInput;