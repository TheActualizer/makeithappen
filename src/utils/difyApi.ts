import { supabase } from "@/integrations/supabase/client";

interface DifyLogData {
  conversationId?: string;
  messageId?: string;
  requestPayload: any;
  difyConversationId?: string;
  startTime: number;
}

export async function sendMessageToDify(message: string, conversationId?: string) {
  console.log('Sending message to Dify:', { message, conversationId });
  const startTime = Date.now();
  let logData: DifyLogData = {
    conversationId,
    requestPayload: { message },
    startTime
  };
  
  try {
    // Get the API key
    const { data: { data: { DIFY_API_KEY } } } = await supabase
      .functions.invoke('get-secret', {
        body: { name: 'DIFY_API_KEY' }
      });

    // Log outbound message
    const { data: messageLog } = await supabase
      .from('dify_message_logs')
      .insert({
        conversation_id: conversationId,
        direction: 'outbound',
        status: 'pending',
        request_payload: { query: message },
      })
      .select()
      .single();

    logData = { ...logData, messageId: messageLog?.id };

    // Call Dify API
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

    const processingTime = Date.now() - startTime;

    // Update message log with success
    await supabase
      .from('dify_message_logs')
      .update({
        status: 'processed',
        response_payload: data,
        processing_time_ms: processingTime,
        dify_conversation_id: data.conversation_id,
      })
      .eq('id', messageLog?.id);

    return data.answer;
  } catch (error) {
    console.error('Error calling Dify API:', error);

    // Log error details
    if (logData.messageId) {
      await supabase
        .from('dify_message_logs')
        .update({
          status: 'failed',
          error_message: error.message,
          processing_time_ms: Date.now() - startTime,
        })
        .eq('id', logData.messageId);

      await supabase
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
    }

    throw error;
  }
}