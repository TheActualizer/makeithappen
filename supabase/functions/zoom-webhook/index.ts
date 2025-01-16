import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createHmac } from "https://deno.land/std@0.182.0/crypto/mod.ts";

const ZOOM_WEBHOOK_SECRET_TOKEN = Deno.env.get('ZOOM_WEBHOOK_SECRET_TOKEN');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Zoom webhook: Starting execution');
    
    // Get the Zoom message signature from headers
    const zoomSignature = req.headers.get('x-zm-signature') || '';
    const zoomTimestamp = req.headers.get('x-zm-request-timestamp') || '';
    
    // Get the raw request body
    const rawBody = await req.text();
    console.log('Zoom webhook: Received payload:', rawBody);

    // Verify the webhook signature
    const message = `v0:${zoomTimestamp}:${rawBody}`;
    const hashForVerify = createHmac('sha256', ZOOM_WEBHOOK_SECRET_TOKEN!)
      .update(message)
      .toString('hex');
    const signature = `v0=${hashForVerify}`;

    if (signature !== zoomSignature) {
      console.error('Zoom webhook: Invalid signature');
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse the verified webhook payload
    const payload = JSON.parse(rawBody);
    console.log('Zoom webhook: Verified payload:', payload);

    // Handle different event types
    switch (payload.event) {
      case 'meeting.started':
        console.log('Zoom webhook: Meeting started:', payload.payload.object);
        // Add your meeting started logic here
        break;
      
      case 'meeting.ended':
        console.log('Zoom webhook: Meeting ended:', payload.payload.object);
        // Add your meeting ended logic here
        break;
      
      // Add more event types as needed
      default:
        console.log('Zoom webhook: Unhandled event type:', payload.event);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Zoom webhook: Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});