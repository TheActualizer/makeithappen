export type MessageType = 'text' | 'system' | 'ai';

export type AIModel = 'dify' | 'gpt-3.5-turbo' | 'gpt-4';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  sender_id: string | null;
  created_at: string;
  conversation_id?: string;
  profiles?: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    avatar_url: string | null;
  } | null;
}

export interface ConversationType {
  id: string;
  title: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  is_archived: boolean;
  provider: 'dify' | string;
  provider_conversation_id: string | null;
}

export interface MessageWithProfile extends Message {
  profiles?: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    avatar_url: string | null;
  } | null;
}