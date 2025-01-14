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
      placeholder="Ask me anything..."
      className="min-h-[60px] w-full pr-20 bg-purple-50/10 dark:bg-purple-900/20 border-purple-200/20 dark:border-purple-800/20 focus:ring-purple-500/50 resize-none rounded-lg placeholder-purple-400 dark:placeholder-purple-300"
    />
  );
};

export default ChatInput;