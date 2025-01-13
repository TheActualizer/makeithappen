import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";

export const useMessageSender = (selectedConversation: string | null, onMessageSent: () => void) => {
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin } = useIsAdmin();
  const { toast } = useToast();

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Send message triggered with:', { 
      newMessage, 
      selectedConversation, 
      isLoading 
    });

    if (!newMessage.trim() || !selectedConversation || isLoading) {
      console.log('Message send prevented:', {
        hasContent: !!newMessage.trim(),
        hasConversation: !!selectedConversation,
        isLoading
      });
      return;
    }

    const messageContent = newMessage.trim();
    console.log('Message content prepared:', messageContent);
    
    setIsLoading(true);
    setNewMessage(''); // Clear input immediately for better UX

    try {
      console.log('Getting current user...');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No authenticated user found');
        throw new Error('Not authenticated');
      }
      console.log('Current user:', user);

      console.log('Inserting message into database...');
      const { error: messageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: selectedConversation,
            content: messageContent,
            sender_id: user.id,
            type: 'text',
            is_admin_message: isAdmin
          },
        ]);

      if (messageError) {
        console.error('Error inserting message:', messageError);
        throw messageError;
      }

      console.log('Message inserted successfully, notifying admin...');
      const { error: notifyError } = await supabase.functions.invoke('notify-admin', {
        body: {
          message: messageContent,
          userId: user.id,
          conversationId: selectedConversation,
        },
      });

      if (notifyError) {
        console.error('Error notifying admin:', notifyError);
      }

      console.log('Message sent and admin notified successfully');
      onMessageSent();
    } catch (error) {
      console.error('Error in sendMessage:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    newMessage,
    setNewMessage,
    isLoading,
    sendMessage
  };
};