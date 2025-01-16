import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    const { name, email, consultationDate, consultationTime, projectType, description } = await req.json()
    
    console.log('Creating consultation meeting for:', {
      name,
      email,
      consultationDate,
      consultationTime,
      projectType,
      description
    });

    // Get Zoom access token
    const accessToken = await getZoomAccessToken();
    
    // Create Zoom meeting
    const startTime = new Date(`${consultationDate} ${consultationTime}`).toISOString();
    const zoomMeeting = await createZoomMeeting(accessToken, startTime);
    
    console.log('Zoom meeting created:', zoomMeeting);

    // Here you would typically send an email with the Zoom meeting details
    // For now, we'll just return the meeting information
    return new Response(
      JSON.stringify({
        success: true,
        meeting: {
          id: zoomMeeting.id,
          join_url: zoomMeeting.join_url,
          start_url: zoomMeeting.start_url,
          password: zoomMeeting.password
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error creating consultation:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})