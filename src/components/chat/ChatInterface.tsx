import React, { useRef, useEffect } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ChatButton from './ChatButton';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChat } from '@/hooks/useChat';

const ChatInterface = () => {
  const {
    isOpen,
    setIsOpen,
    messages,
    newMessage,
    setNewMessage,
    selectedModel,
    setSelectedModel,
    isLoading,
    sendMessage
  } = useChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOpen = (open: boolean) => {
    console.log('Chat interface visibility changed:', open);
    setIsOpen(open);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpen}>
      <ChatButton />
      <SheetContent className="w-[400px] sm:w-[540px] h-full flex flex-col p-0">
        <ChatHeader selectedModel={selectedModel} onModelChange={setSelectedModel} />
        <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />
        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSubmit={sendMessage}
          isLoading={isLoading}
        />
      </SheetContent>
    </Sheet>
  );
};

export default ChatInterface;