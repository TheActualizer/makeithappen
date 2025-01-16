import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createHmac } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function getZoomAccessToken() {
  const clientId = Deno.env.get('ZOOM_CLIENT_ID');
  const clientSecret = Deno.env.get('ZOOM_CLIENT_SECRET');
  
  if (!clientId || !clientSecret) {
    throw new Error('Zoom credentials not configured');
  }

  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = btoa(credentials);

  const response = await fetch('https://zoom.us/oauth/token?grant_type=client_credentials', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encodedCredentials}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get Zoom access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function createZoomMeeting(accessToken: string, startTime: string, duration: number = 30) {
  const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic: 'Consultation Meeting',
      type: 2, // Scheduled meeting
      start_time: startTime,
      duration: duration,
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: true,
        waiting_room: false,
        auto_recording: 'none',
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create Zoom meeting: ${response.statusText}`);
  }

  return response.json();
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const signature = req.headers.get('x-zm-signature') || '';
    const timestamp = req.headers.get('x-zm-request-timestamp') || '';
    const webhookToken = Deno.env.get('ZOOM_WEBHOOK_SECRET_TOKEN');

    if (!webhookToken) {
      throw new Error('Webhook secret token not configured');
    }

    // Verify webhook signature
    const message = `v0:${timestamp}:${await req.text()}`;
    const hmac = createHmac('sha256', webhookToken);
    hmac.update(message);
    const hashForVerify = `v0=${hmac.toString('hex')}`;

    if (signature !== hashForVerify) {
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Process the webhook event
    const body = JSON.parse(message.split(':')[2]);
    console.log('Received Zoom webhook event:', body);

    // Handle different event types
    switch (body.event) {
      case 'meeting.started':
        console.log('Meeting started:', body.payload.object);
        break;
      case 'meeting.ended':
        console.log('Meeting ended:', body.payload.object);
        break;
      default:
        console.log('Unhandled event type:', body.event);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error processing Zoom webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
})