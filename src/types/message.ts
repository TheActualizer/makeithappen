export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  type: 'text' | 'image' | 'file';
  created_at: string;
  updated_at: string;
  is_admin_message: boolean;
}

export interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url: string | null;
  role: 'user' | 'admin';
}

export interface MessageWithProfile extends Message {
  profile: ProfileData;
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