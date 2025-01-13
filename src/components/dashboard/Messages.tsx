import React from 'react';
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useMessages } from "@/hooks/useMessages";
import { useMessageSender } from "@/hooks/useMessageSender";
import { ConversationList } from './messages/ConversationList';
import { MessageArea } from './messages/MessageArea';
import { MonitoringPanel } from './monitoring/MonitoringPanel';

export const Messages = () => {
  const { isAdmin } = useIsAdmin();
  const {
    data: messages,
    selectedConversation,
    setSelectedConversation,
    fetchMessages 
  } = useMessages(selectedConversation?.id || '');

  const {
    newMessage,
    setNewMessage,
    isLoading,
    sendMessage
  } = useMessageSender(selectedConversation?.id || '', () => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  });

  const selectConversation = (conversationId: string) => {
    console.log('Selecting conversation:', conversationId);
    setSelectedConversation(conversationId);
    fetchMessages(conversationId);
  };

  return (
    <div className="space-y-6">
      {isAdmin && <MonitoringPanel />}
      <div className="flex h-[calc(100vh-12rem)] gap-4">
        <ConversationList
          conversations={messages?.conversations || []}
          selectedConversation={selectedConversation}
          onSelectConversation={selectConversation}
        />
        <MessageArea
          messages={messages?.messages || []}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};