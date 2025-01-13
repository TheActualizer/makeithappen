import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, userId, conversationId } = await req.json()
    console.log('Notification function called with:', { message, userId, conversationId })

    if (!message || !userId || !conversationId) {
      throw new Error('Missing required fields')
    }

    // Initialize Supabase client with service role key
    const supabase = createClient(
      SUPABASE_URL!,
      SUPABASE_SERVICE_ROLE_KEY!
    )

    // Fetch user profile and project details
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    const { data: projects } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)

    const projectInfo = projects?.[0]
    const adminDashboardUrl = `${SUPABASE_URL}/dashboard/users/${userId}`

    // Prepare email content
    const emailHtml = `
      <h2>New Message from ${profile?.first_name} ${profile?.last_name}</h2>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>User Email:</strong> ${profile?.email}</p>
      <p><strong>User Profile:</strong> <a href="${adminDashboardUrl}">View in Dashboard</a></p>
      ${projectInfo ? `
        <h3>Latest Project Information:</h3>
        <p><strong>Project Name:</strong> ${projectInfo.name}</p>
        <p><strong>Project Type:</strong> ${projectInfo.project_type?.join(', ')}</p>
        <p><strong>Description:</strong> ${projectInfo.description}</p>
      ` : ''}
      <p><a href="${SUPABASE_URL}/dashboard/messages">View Conversation</a></p>
    `

    // Send email via Resend
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured')
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'MakeITHappen Support <support@makeitappen.ai>',
        to: 'belchonen18@gmail.com',
        subject: `New Message from ${profile?.first_name} ${profile?.last_name}`,
        html: emailHtml,
      }),
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      throw new Error(`Failed to send email: ${errorText}`)
    }

    // Update message to indicate it's for admin
    const { error: messageError } = await supabase
      .from('messages')
      .update({ is_admin_message: true })
      .eq('conversation_id', conversationId)
      .eq('sender_id', userId)

    if (messageError) {
      throw messageError
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in notify-admin function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})