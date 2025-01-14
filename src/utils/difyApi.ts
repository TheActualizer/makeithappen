import { supabase } from '@/integrations/supabase/client';

export async function sendMessageToDify(message: string, conversationId: string) {
  console.log('Starting Dify API call:', { message, conversationId });
  
  try {
    console.log('Fetching Dify API key...');
    const { data: { secret: DIFY_API_KEY }, error: secretError } = await supabase
      .functions.invoke('get-secret', {
        body: { name: 'DIFY_API_KEY' }
      });

    if (secretError) {
      console.error('Failed to get Dify API key:', secretError);
      throw new Error(`Failed to get Dify API key: ${secretError.message}`);
    }

    console.log('Making request to Dify API...');
    const response = await fetch('https://api.dify.ai/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        inputs: {},
        query: message,
        response_mode: 'blocking'
      })
    });

    if (!response.ok) {
      const errorData = await response.clone().json();
      console.error('Dify API error response:', errorData);
      throw new Error(`Dify API error: ${errorData.message || response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Dify API response:', responseData);

    return responseData;
  } catch (error) {
    console.error('Error in Dify API call:', error);
    throw error;
  }
}