import { supabase } from "@/integrations/supabase/client";

interface DifyLogData {
  conversationId?: string;
  messageId?: string;
  requestPayload: any;
  difyConversationId?: string;
  startTime: number;
}

export async function sendMessageToDify(message: string, conversationId?: string) {
  console.log('Starting Dify API call:', { message, conversationId });
  const startTime = Date.now();
  let logData: DifyLogData = {
    conversationId,
    requestPayload: { message },
    startTime
  };
  
  try {
    // Get the API key
    console.log('Fetching Dify API key...');
    const { data: { data: { DIFY_API_KEY } } } = await supabase
      .functions.invoke('get-secret', {
        body: { name: 'DIFY_API_KEY' }
      });

    if (!DIFY_API_KEY) {
      console.error('No Dify API key found');
      throw new Error('DIFY_API_KEY not configured');
    }

    // Log outbound message
    console.log('Logging outbound message...');
    const { data: messageLog, error: logError } = await supabase
      .from('dify_message_logs')
      .insert({
        conversation_id: conversationId,
        direction: 'outbound',
        status: 'pending',
        request_payload: { query: message },
      })
      .select()
      .single();

    if (logError) {
      console.error('Error logging outbound message:', logError);
      throw logError;
    }

    logData = { ...logData, messageId: messageLog?.id };
    console.log('Message logged successfully:', messageLog);

    // Call Dify API
    console.log('Calling Dify API...');
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
      console.error('Dify API error:', response.status, response.statusText);
      throw new Error(`Dify API error: ${response.status}`);
    }

    // Clone the response before reading it
    const responseClone = response.clone();
    const data = await responseClone.json();
    console.log('Dify API response:', data);

    const processingTime = Date.now() - startTime;
    console.log('Processing time:', processingTime, 'ms');

    // Update message log with success
    const { error: updateError } = await supabase
      .from('dify_message_logs')
      .update({
        status: 'processed',
        response_payload: data,
        processing_time_ms: processingTime,
        dify_conversation_id: data.conversation_id,
      })
      .eq('id', messageLog?.id);

    if (updateError) {
      console.error('Error updating message log:', updateError);
    }

    return data.answer;
  } catch (error) {
    console.error('Error in Dify API call:', error);

    // Log error details
    if (logData.messageId) {
      const { error: logUpdateError } = await supabase
        .from('dify_message_logs')
        .update({
          status: 'failed',
          error_message: error.message,
          processing_time_ms: Date.now() - startTime,
        })
        .eq('id', logData.messageId);

      if (logUpdateError) {
        console.error('Error updating message log with error:', logUpdateError);
      }

      const { error: errorLogError } = await supabase
        .from('dify_error_logs')
        .insert({
          message_log_id: logData.messageId,
          error_message: error.message,
          error_stack: error.stack,
          context: {
            conversation_id: conversationId,
            request: logData.requestPayload,
          },
        });

      if (errorLogError) {
        console.error('Error creating error log:', errorLogError);
      }
    }

    throw error;
  }
}