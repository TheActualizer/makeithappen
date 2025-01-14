import { supabase } from '@/integrations/supabase/client';

export async function sendMessageToDify(message: string, conversationId: string) {
  const startTime = performance.now();
  
  console.log('DifyAPI: Starting API call', { 
    messageLength: message.length, 
    conversationId,
    timestamp: new Date().toISOString(),
    startTime
  });
  
  try {
    console.log('DifyAPI: Fetching API key from Supabase');
    const { data, error: secretError } = await supabase
      .functions.invoke('get-secret', {
        body: { name: 'DIFY_API_KEY' }
      });

    if (secretError) {
      console.error('DifyAPI: Failed to get API key:', secretError);
      throw new Error(`Failed to get Dify API key: ${secretError.message}`);
    }

    const DIFY_API_KEY = data?.DIFY_API_KEY;
    
    if (!DIFY_API_KEY) {
      console.error('DifyAPI: No API key found in response');
      throw new Error('No Dify API key found in response');
    }

    console.log('DifyAPI: Making request to Dify API', {
      conversationId,
      timestamp: new Date().toISOString(),
      hasApiKey: !!DIFY_API_KEY
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

    console.log('DifyAPI: Received response from Dify', {
      status: response.status,
      ok: response.ok,
      timestamp: new Date().toISOString()
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
    const endTime = performance.now();
    
    console.log('DifyAPI: Successfully parsed response:', {
      hasAnswer: !!responseData.answer,
      responseLength: responseData.answer?.length,
      processingTime: endTime - startTime,
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
          processing_time_ms: endTime - startTime
        }
      ]);

    if (logError) {
      console.error('DifyAPI: Error logging interaction:', logError);
    } else {
      console.log('DifyAPI: Successfully logged interaction');
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