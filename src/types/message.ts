export interface Message {
  id: string;
  content: string;
  sender_id: string | null;
  created_at: string;
  conversation_id?: string;
  type?: 'text' | 'system' | 'ai';
  is_admin_message?: boolean;
  profiles?: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    avatar_url: string | null;
  } | null;
}

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
}