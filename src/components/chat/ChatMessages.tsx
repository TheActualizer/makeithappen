import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import type { Message } from '@/types/message';

const ChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    console.log('Current messages in ChatMessages:', messages);
  }, [messages]);

  // Function to add new message that can be called from ChatInput
  const addMessage = (message: Message) => {
    console.log('Adding new message:', message);
    setMessages(prev => [...prev, message]);
  };

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;