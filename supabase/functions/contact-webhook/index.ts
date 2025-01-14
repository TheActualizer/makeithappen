import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    const { SUPABASE_URL, SUPABASE_ANON_KEY } = Deno.env.toObject()
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

    // Get the latest contact submissions that are pending
    const { data: submissions, error: fetchError } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('automation_status', 'pending')
      .order('created_at', { ascending: true })

    if (fetchError) {
      console.error('Error fetching submissions:', fetchError)
      throw fetchError
    }

    console.log(`Processing ${submissions?.length || 0} pending submissions`)

    // Process each submission
    for (const submission of submissions || []) {
      try {
        console.log('Processing submission:', submission.id)
        
        // Send to Make.com webhook
        const response = await fetch(MAKE_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: submission.id,
            name: submission.name,
            email: submission.email,
            phone: submission.phone,
            project_type: submission.project_type,
            message: submission.message,
            created_at: submission.created_at
          }),
        })

        if (!response.ok) {
          throw new Error(`Make.com webhook failed: ${response.statusText}`)
        }

        // Update submission status
        const { error: updateError } = await supabase
          .from('contact_submissions')
          .update({
            automation_status: 'processed',
            processed_at: new Date().toISOString()
          })
          .eq('id', submission.id)

        if (updateError) {
          throw updateError
        }

        console.log('Successfully processed submission:', submission.id)

      } catch (error) {
        console.error('Error processing submission:', submission.id, error)
        
        // Update submission with error status
        await supabase
          .from('contact_submissions')
          .update({
            automation_status: 'error',
            last_error: error.message
          })
          .eq('id', submission.id)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: submissions?.length || 0 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in contact-webhook function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})