import React from 'react';
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useMessages } from "@/hooks/useMessages";
import { useMessageSender } from "@/hooks/useMessageSender";
import { ConversationList } from './messages/ConversationList';
import MessageArea from './messages/MessageArea';
import { MonitoringPanel } from './monitoring/MonitoringPanel';

export const Messages = () => {
  const { isAdmin } = useIsAdmin();
  const {
    conversations,
    messages,
    selectedConversation,
    setSelectedConversation,
    loading
  } = useMessages();

  const {
    newMessage,
    setNewMessage,
    isLoading: sendingMessage,
    sendMessage
  } = useMessageSender(selectedConversation, () => {
    // Refresh messages will be handled by real-time subscription
    console.log('Message sent, real-time updates will refresh the messages');
  });

  const selectConversation = (conversationId: string) => {
    console.log('Selecting conversation:', conversationId);
    setSelectedConversation(conversationId);
  };

  return (
    <div className="space-y-6">
      {isAdmin && <MonitoringPanel />}
      <div className="flex h-[calc(100vh-12rem)] gap-4">
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={selectConversation}
        />
        <MessageArea
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={sendMessage}
          isLoading={sendingMessage || loading}
        />
      </div>
    </div>
  );
};