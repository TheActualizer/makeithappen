import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define all required Zoom scopes
const ZOOM_SCOPES = [
  // Account scopes
  'account:master',
  'account:read:admin',
  'account:write:admin',
  'account_profile:read:admin',
  'account_profile:write:admin',
  'account_settings:read:admin',
  'account_settings:write:admin',
  
  // User management
  'user:read:admin',
  'user:write:admin',
  'user_profile:read:admin',
  'user_profile:write:admin',
  
  // Meeting scopes
  'meeting:read:admin',
  'meeting:write:admin',
  'meeting_token:read:admin',
  'meeting_security:read:admin',
  'meeting_security:write:admin',
  
  // Recording scopes
  'recording:read:admin',
  'recording:write:admin',
  'recording_token:read:admin',
  
  // Webinar
  'webinar:read:admin',
  'webinar:write:admin',
  
  // Calendar
  'calendar:read:admin',
  'calendar:write:admin',
  
  // Chat
  'chat_channel:read:admin',
  'chat_channel:write:admin',
  'chat_message:read:admin',
  'chat_message:write:admin',
  
  // Phone
  'phone:read:admin',
  'phone:write:admin',
  
  // Billing
  'billing:read:admin',
  'billing:write:admin',
  
  // Reports
  'report:read:admin',
  'report:write:admin',
  
  // Rooms
  'room:read:admin',
  'room:write:admin',
  
  // Contact Center
  'contact_center:read:admin',
  'contact_center:write:admin'
].join(' ');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    
    if (!code) {
      console.error('No authorization code received from Zoom');
      throw new Error('No authorization code received');
    }

    console.log('Received Zoom authorization code:', code);

    const clientId = Deno.env.get('ZOOM_CLIENT_ID');
    const clientSecret = Deno.env.get('ZOOM_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      console.error('Missing Zoom credentials');
      throw new Error('Missing Zoom credentials');
    }

    // Exchange the code for an access token
    const tokenResponse = await fetch('https://zoom.us/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${url.origin}/functions/v1/zoom-oauth-callback`,
        scope: ZOOM_SCOPES,
      }),
    });

    if (!tokenResponse.ok) {
      console.error('Failed to exchange code for token:', await tokenResponse.text());
      throw new Error('Failed to exchange code for token');
    }

    const tokenData = await tokenResponse.json();
    console.log('Successfully obtained Zoom access token');

    // Get user information
    const userResponse = await fetch('https://api.zoom.us/v2/users/me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      console.error('Failed to get user info:', await userResponse.text());
      throw new Error('Failed to get user information');
    }

    const userData = await userResponse.json();
    console.log('Retrieved Zoom user data:', userData);

    // Store the tokens securely
    // Note: In a production environment, you should store these securely
    // and implement token refresh logic
    console.log('Zoom OAuth flow completed successfully');

    // Redirect to success page or close the window
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Zoom Authorization Complete</title>
        </head>
        <body>
          <h1>Authorization Successful!</h1>
          <p>You can close this window now.</p>
          <script>
            window.close();
          </script>
        </body>
      </html>
      `,
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/html',
        },
      }
    );

  } catch (error) {
    console.error('Error in Zoom OAuth callback:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'An error occurred during Zoom authorization',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});