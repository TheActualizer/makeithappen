import React from 'react';
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useQuery } from "@tanstack/react-query";
import { useMessageSender } from "@/hooks/useMessageSender";
import { ConversationList } from './messages/ConversationList';
import { MessageArea } from './messages/MessageArea';
import { MonitoringPanel } from './monitoring/MonitoringPanel';
import { supabase } from "@/integrations/supabase/client";

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  created_by: string;
  is_archived: boolean;
  provider: "openai" | "dify" | "anthropic" | "google";
  provider_conversation_id: string;
  updated_at: string;
}

export const Messages = () => {
  const { isAdmin } = useIsAdmin();
  const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(null);

  const { data: conversationsData } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const { data } = await supabase
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false });
      return data || [];
    },
  });

  const { data: messagesData, refetch: fetchMessages } = useQuery({
    queryKey: ['messages', selectedConversation?.id],
    queryFn: async () => {
      if (!selectedConversation?.id) return [];
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', selectedConversation.id)
        .order('created_at', { ascending: true });
      return data || [];
    },
    enabled: !!selectedConversation?.id,
  });

  const {
    newMessage,
    setNewMessage,
    isLoading,
    sendMessage
  } = useMessageSender(selectedConversation?.id || '', () => {
    if (selectedConversation) {
      fetchMessages();
    }
  });

  const handleSelectConversation = (conversationId: string) => {
    const conversation = conversationsData?.find(c => c.id === conversationId);
    setSelectedConversation(conversation || null);
  };

  return (
    <div className="space-y-6">
      {isAdmin && <MonitoringPanel />}
      <div className="flex h-[calc(100vh-12rem)] gap-4">
        <ConversationList
          selectedConversationId={selectedConversation?.id || ''}
          onSelect={handleSelectConversation}
        />
        <MessageArea
          messages={messagesData || []}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};