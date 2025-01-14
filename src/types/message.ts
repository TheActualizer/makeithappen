export type MessageType = 'text' | 'system' | 'ai';
export type AIModel = 'gpt-4o-mini' | 'gpt-4o' | 'claude' | 'gemini' | 'dify';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  sender_id: string | null;
  created_at: string;
  conversation_id?: string;
  profiles?: ProfileData | null;
}

export interface MessageWithProfile extends Message {
  profile: ProfileData;
}

export interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url: string | null;
  role: 'admin' | 'user';
}

export interface MessageAreaProps {
  messages: MessageWithProfile[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

export interface ConversationType {
  id: string;
  title: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  is_archived: boolean;
  provider: 'dify' | 'openai';
  provider_conversation_id: string | null;
}