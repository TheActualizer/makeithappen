import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const MAKE_WEBHOOK_URL = "https://hook.us1.make.com/jmjklarkk3xze2leld2ldohp94x6t5tc";

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
    console.log('Contact webhook: Starting execution');
    
    // Get the request body
    const requestData = await req.json();
    console.log('Contact webhook: Received data:', requestData);

    // Send to Make.com webhook
    console.log('Contact webhook: Sending to Make.com webhook');
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Make.com webhook failed: ${response.statusText}`);
    }

    console.log('Contact webhook: Successfully sent to Make.com');

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Contact webhook: Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})