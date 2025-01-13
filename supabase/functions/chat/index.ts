import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, model, conversationId } = await req.json()

    if (!message) {
      throw new Error('Message is required')
    }

    let answer = ''

    // Initialize DIFY API call
    if (model === 'dify') {
      const difyApiKey = Deno.env.get('DIFY_API_KEY')
      
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
        throw new Error('Failed to get response from DIFY')
      }

      const data = await response.json()
      answer = data.answer
    }
    // Handle OpenAI models
    else if (model.startsWith('gpt')) {
      const openai = new OpenAI({
        apiKey: Deno.env.get('OPENAI_API_KEY')
      })

      const completion = await openai.chat.completions.create({
        model: model === 'gpt-4o' ? 'gpt-4o' : 'gpt-4o-mini',
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant focused on providing clear, accurate, and concise responses."
          },
          {
            role: "user",
            content: message
          }
        ],
      })

      answer = completion.choices[0].message.content || 'Sorry, I could not generate a response.'
    }
    // Add Claude integration when available
    else if (model === 'claude') {
      answer = "Claude integration coming soon!"
    }
    // Add Gemini integration when available
    else if (model === 'gemini') {
      answer = "Gemini integration coming soon!"
    }

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