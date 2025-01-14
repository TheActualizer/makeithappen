import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, model, conversationId } = await req.json()
    console.log('Chat function called with:', { message, model, conversationId })

    if (!message) {
      console.error('No message provided');
      throw new Error('Message is required')
    }

    const difyApiKey = Deno.env.get('DIFY_API_KEY')
    if (!difyApiKey) {
      console.error('DIFY_API_KEY not configured');
      throw new Error('DIFY_API_KEY is not configured')
    }

    // First, create or get conversation in Dify
    console.log('Creating/getting Dify conversation...');
    const conversationResponse = await fetch('https://api.dify.ai/v1/conversations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${difyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: conversationId,
      }),
    });

    if (!conversationResponse.ok) {
      const errorText = await conversationResponse.text();
      console.error('Dify conversation creation error:', { status: conversationResponse.status, body: errorText });
      throw new Error(`Dify conversation creation error: ${conversationResponse.status} ${errorText}`);
    }

    const conversationData = await conversationResponse.json();
    console.log('Dify conversation created/retrieved:', conversationData);
    
    // Then send the message
    console.log('Calling DIFY API with message:', message);
    const response = await fetch('https://api.dify.ai/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${difyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {},
        query: message,
        user: conversationId,
        response_mode: 'blocking',
        conversation_id: conversationId,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('DIFY API error:', { status: response.status, body: errorText });
      throw new Error(`DIFY API error: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    console.log('DIFY API response:', data);

    if (!data.answer) {
      console.error('No answer in DIFY response:', data);
      throw new Error('No answer received from DIFY API')
    }

    return new Response(
      JSON.stringify({ answer: data.answer }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})