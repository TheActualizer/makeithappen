import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'https://esm.sh/resend@0.16.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  projectType: string
  message: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate environment variables
    const { SUPABASE_URL, SUPABASE_ANON_KEY, RESEND_API_KEY } = Deno.env.toObject()
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !RESEND_API_KEY) {
      console.error('Missing required environment variables')
      throw new Error('Server configuration error')
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    const resend = new Resend(RESEND_API_KEY)

    // Parse and validate request body
    const submission: ContactSubmission = await req.json()
    console.log('Received submission:', submission)

    if (!submission.id || !submission.email || !submission.name) {
      throw new Error('Missing required fields in submission')
    }

    // Create contact funnel entry
    const { data: funnelData, error: funnelError } = await supabase
      .from('contact_funnel')
      .insert({
        contact_submission_id: submission.id,
        current_stage: 'inquiry',
        status: 'new',
        notes: `Initial contact via web form\nProject Type: ${submission.projectType}\nMessage: ${submission.message}`
      })
      .select()
      .single()

    if (funnelError) {
      console.error('Error creating funnel entry:', funnelError)
      throw new Error('Failed to create funnel entry')
    }

    console.log('Created funnel entry:', funnelData)

    // Send notification email
    try {
      const emailResult = await resend.emails.send({
        from: 'Cytoom <no-reply@cytoom.com>',
        to: ['belchonen18@gmail.com'], // Admin notification
        subject: `New Contact Form Submission - ${submission.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${submission.name}</p>
          <p><strong>Email:</strong> ${submission.email}</p>
          <p><strong>Phone:</strong> ${submission.phone || 'Not provided'}</p>
          <p><strong>Project Type:</strong> ${submission.projectType}</p>
          <p><strong>Message:</strong></p>
          <p>${submission.message}</p>
        `
      })

      console.log('Email sent successfully:', emailResult)

      // Create email communication record
      const { error: communicationError } = await supabase
        .from('email_communications')
        .insert({
          contact_funnel_id: funnelData.id,
          status: 'sent',
          email_data: {
            type: 'admin_notification',
            recipient: 'admin',
            subject: `New Contact Form Submission - ${submission.name}`
          }
        })

      if (communicationError) {
        console.error('Error logging email communication:', communicationError)
        // Don't throw here, as the email was sent successfully
      }

    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Don't throw here, we still want to return success for the submission
    }

    // Return success response with funnel ID
    return new Response(
      JSON.stringify({
        status: 'success',
        message: 'Contact submission processed',
        funnelId: funnelData.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error processing submission:', error)
    
    return new Response(
      JSON.stringify({
        status: 'error',
        message: error.message || 'An error occurred processing your submission',
        error: error.toString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})