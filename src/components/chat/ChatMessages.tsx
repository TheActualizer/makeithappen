import React from 'react';
import ChatMessage from './ChatMessage';
import { useMessages } from '@/hooks/useMessages';

const ChatMessages = () => {
  const { messages } = useMessages();

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;