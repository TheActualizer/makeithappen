import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import type { MessageWithProfile, MessageAreaProps } from '@/types/message';
import ChatMessage from '@/components/chat/ChatMessage';

const MessageArea: React.FC<MessageAreaProps> = ({
  messages,
  newMessage,
  setNewMessage,
  onSendMessage,
  isLoading
}) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageArea;