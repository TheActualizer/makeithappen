export interface Profile {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

export interface Message {
  id: string;
  content: string;
  sender_id: string | null;
  created_at: string;
  conversation_id?: string;
  type: 'text' | 'system' | 'ai';  // Made type required
  profiles?: Profile | null;
}

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  provider?: 'dify' | 'openai';
}