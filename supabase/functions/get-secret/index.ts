import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    // Parse the request body
    const { name } = await req.json()
    
    if (!name) {
      throw new Error('Secret name is required')
    }

    console.log(`Fetching secret: ${name}`)
    const value = Deno.env.get(name)

    if (!value) {
      console.error(`Secret ${name} not found`)
      return new Response(
        JSON.stringify({ 
          error: `Secret ${name} not found` 
        }), 
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log(`Successfully retrieved secret: ${name}`)
    return new Response(
      JSON.stringify({ value }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in get-secret function:', error.message)
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})