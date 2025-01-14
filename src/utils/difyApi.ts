import { supabase } from '@/integrations/supabase/client';

export async function sendMessageToDify(message: string, conversationId: string) {
  console.log('DifyAPI: Starting API call', { 
    messageLength: message.length, 
    conversationId,
    timestamp: new Date().toISOString()
  });
  
  try {
    console.log('DifyAPI: Fetching API key from Supabase');
    const { data: { secret: DIFY_API_KEY }, error: secretError } = await supabase
      .functions.invoke('get-secret', {
        body: { name: 'DIFY_API_KEY' }
      });

    if (secretError) {
      console.error('DifyAPI: Failed to get API key:', secretError);
      throw new Error(`Failed to get Dify API key: ${secretError.message}`);
    }

    console.log('DifyAPI: Making request to Dify API', {
      conversationId,
      timestamp: new Date().toISOString()
    });

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
      console.error('DifyAPI: Error response:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
        timestamp: new Date().toISOString()
      });
      throw new Error(`Dify API error: ${errorData.message || response.statusText}`);
    }

    const responseData = await response.json();
    console.log('DifyAPI: Successful response:', {
      hasAnswer: !!responseData.answer,
      responseLength: responseData.answer?.length,
      timestamp: new Date().toISOString()
    });

    // Log the interaction
    console.log('DifyAPI: Logging interaction in dify_message_logs');
    const { error: logError } = await supabase
      .from('dify_message_logs')
      .insert([
        {
          conversation_id: conversationId,
          direction: 'outbound',
          status: 'processed',
          request_payload: { message },
          response_payload: responseData,
          processing_time_ms: Date.now() - performance.now()
        }
      ]);

    if (logError) {
      console.error('DifyAPI: Error logging interaction:', logError);
    }

    return responseData;
  } catch (error) {
    console.error('DifyAPI: Error in API call:', {
      error,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}