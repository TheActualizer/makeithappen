import { supabase } from "@/integrations/supabase/client";

export async function sendMessageToDify(message: string, conversationId?: string) {
  console.log('Sending message to Dify:', { message, conversationId });
  
  try {
    const { data: { data: { DIFY_API_KEY } } } = await supabase
      .functions.invoke('get-secret', {
        body: { name: 'DIFY_API_KEY' }
      });

    const response = await fetch('https://api.dify.ai/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {},
        query: message,
        user: conversationId,
        response_mode: 'blocking',
        conversation_id: conversationId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Dify API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Dify API response:', data);

    return data.answer;
  } catch (error) {
    console.error('Error calling Dify API:', error);
    throw error;
  }
}