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
      throw new Error(`Failed to get Dify API key: ${secretError.message}`);
    }

    // Log outbound message to Supabase
    console.log('Logging outbound message...');
    const { error: logError } = await supabase
      .from('dify_message_logs')
      .insert({
        conversation_id: conversationId,
        direction: 'outbound',
        status: 'pending',
        request_payload: { message }
      });

    if (logError) {
      console.error('Error logging outbound message:', logError);
      throw logError;
    }

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
      const errorData = await response.json();
      throw new Error(`Dify API error: ${errorData.message || response.statusText}`);
    }

    // Clone the response before reading it
    const responseClone = response.clone();
    const responseData = await responseClone.json();

    // Update the message log with the response
    const { error: updateError } = await supabase
      .from('dify_message_logs')
      .update({
        status: 'processed',
        response_payload: responseData,
        processing_time_ms: Date.now() - performance.now()
      })
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (updateError) {
      console.error('Error updating message log:', updateError);
    }

    return responseData;
  } catch (error) {
    console.error('Error in Dify API call:', error);
    throw error;
  }
}