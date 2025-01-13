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
    data: { 
      conversations,
      messages,
      selectedConversation,
      setSelectedConversation,
      fetchMessages 
    } = {
      conversations: [],
      messages: [],
      selectedConversation: null,
      setSelectedConversation: () => {},
      fetchMessages: () => {}
    }
  } = useMessages();

  const {
    newMessage,
    setNewMessage,
    isLoading,
    sendMessage
  } = useMessageSender(selectedConversation, () => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
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
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={selectConversation}
        />
        <MessageArea
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};