import { useState } from 'react';
import { Message } from '@/types/message';

export const useChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage,
          model: selectedModel,
        }),
      });

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: data.id, content: newMessage, type: 'text', sender_id: null, created_at: new Date().toISOString() },
        { id: data.responseId, content: data.response, type: 'ai', sender_id: null, created_at: new Date().toISOString() },
      ]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    messages,
    newMessage,
    setNewMessage,
    selectedModel,
    setSelectedModel,
    isLoading,
    sendMessage
  };
};
