import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const AIRTABLE_API_KEY = Deno.env.get('AIRTABLE_API_KEY')
const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0'

serve(async (req) => {
  console.log('Airtable sync function called')

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { projectId, operation, data } = await req.json()
    const baseId = 'your_base_id' // Replace with your Airtable base ID
    const tableName = 'Project Progress' // Replace with your table name

    console.log(`Operation: ${operation}, Project ID: ${projectId}`)

    switch (operation) {
      case 'sync':
        const response = await fetch(`${AIRTABLE_BASE_URL}/${baseId}/${tableName}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Airtable API error: ${response.statusText}`)
        }

        const airtableData = await response.json()
        console.log('Airtable data fetched successfully')

        return new Response(
          JSON.stringify({ data: airtableData }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'update':
        const updateResponse = await fetch(`${AIRTABLE_BASE_URL}/${baseId}/${tableName}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            records: [{
              id: data.recordId,
              fields: data.fields
            }]
          })
        })

        if (!updateResponse.ok) {
          throw new Error(`Airtable API error: ${updateResponse.statusText}`)
        }

        console.log('Airtable record updated successfully')
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      default:
        throw new Error('Invalid operation')
    }
  } catch (error) {
    console.error('Error in airtable-sync function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})