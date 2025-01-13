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
    console.log('Received request:', { message, model, conversationId })

    if (!message) {
      throw new Error('Message is required')
    }

    let answer = ''

    // Initialize DIFY API call
    if (model === 'dify') {
      const difyApiKey = Deno.env.get('DIFY_API_KEY')
      console.log('Using DIFY API with conversation ID:', conversationId)
      
      const response = await fetch('https://api.dify.ai/v1/chat-messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${difyApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {},
          query: message,
          response_mode: 'blocking',
          conversation_id: conversationId,
        }),
      })

      if (!response.ok) {
        console.error('DIFY API error:', await response.text())
        throw new Error('Failed to get response from DIFY')
      }

      const data = await response.json()
      console.log('DIFY API response:', data)
      answer = data.answer
    }
    // Handle other models if needed
    else {
      throw new Error(`Unsupported model: ${model}`)
    }

    if (!answer) {
      throw new Error('No answer received from AI service')
    }

    console.log('Sending answer:', answer)
    return new Response(
      JSON.stringify({ answer }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in chat function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})