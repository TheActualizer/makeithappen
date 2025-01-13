import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useMessages = (conversationId: string) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const { data: messages, error } = await supabase
        .from("messages")
        .select(`
          *,
          sender:profiles(
            first_name,
            last_name,
            email,
            avatar_url
          )
        `)
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      return messages.map((message: any) => ({
        ...message,
        sender: message.sender ? {
          firstName: message.sender.first_name,
          lastName: message.sender.last_name,
          email: message.sender.email,
          avatarUrl: message.sender.avatar_url,
        } : null,
      }));
    },
  });
};

export default useMessages;