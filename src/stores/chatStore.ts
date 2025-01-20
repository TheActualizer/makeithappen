import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface ChatStore {
  conversationId: string;
  setConversationId: (id: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  conversationId: uuidv4(),
  setConversationId: (id: string) => set({ conversationId: id }),
}));