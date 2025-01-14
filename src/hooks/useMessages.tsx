import { useEffect, useState } from "react";
import type { Message } from "@/types/message";

type FormattedMessage = {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  conversation_id: string;
  type: string;
  profiles: {
    first_name: string;
    last_name: string;
    email: string;
    avatar_url: string;
  } | null;
};

const formatMessages = (messages: Message[]): FormattedMessage[] => {
  return messages.map(msg => ({
    id: msg.id,
    content: msg.content,
    sender_id: msg.sender_id,
    created_at: msg.created_at,
    conversation_id: msg.conversation_id,
    type: msg.type || 'text',
    profiles: msg.profiles && 'id' in msg.profiles ? {
      first_name: msg.profiles.first_name || '',
      last_name: msg.profiles.last_name || '',
      email: msg.profiles.email || '',
      avatar_url: msg.profiles.avatar_url || ''
    } : null
  }));
};

const useMessages = (conversationId: string) => {
  const [messages, setMessages] = useState<FormattedMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      // Fetch messages from your API or database
      const response = await fetch(`/api/messages?conversationId=${conversationId}`);
      const data: Message[] = await response.json();
      setMessages(formatMessages(data));
    };

    fetchMessages();
  }, [conversationId]);

  return messages;
};

export default useMessages;
