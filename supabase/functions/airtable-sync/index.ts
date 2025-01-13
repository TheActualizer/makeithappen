import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const AIRTABLE_API_KEY = Deno.env.get('AIRTABLE_API_KEY')
const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0'

interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
}

async function createAirtableBase() {
  console.log('Creating new Airtable base...');
  
  const workspaceId = 'your_workspace_id'; // You'll need to provide this
  const response = await fetch('https://api.airtable.com/v0/meta/bases', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Project Progress Tracking',
      workspaceId,
      tables: [
        {
          name: 'Milestones',
          description: 'Project milestones tracking',
          fields: [
            { name: 'Name', type: 'singleLineText' },
            { 
              name: 'Status', 
              type: 'singleSelect',
              options: {
                choices: [
                  { name: 'Not Started' },
                  { name: 'In Progress' },
                  { name: 'Completed' }
                ]
              }
            },
            { name: 'Due Date', type: 'date' },
            { name: 'Description', type: 'multilineText' },
            { name: 'Next Steps', type: 'multilineText' },
            { name: 'Project ID', type: 'singleLineText' }
          ]
        },
        {
          name: 'Sprints',
          description: 'Sprint tracking',
          fields: [
            { name: 'Name', type: 'singleLineText' },
            {
              name: 'Status',
              type: 'singleSelect',
              options: {
                choices: [
                  { name: 'Planned' },
                  { name: 'Active' },
                  { name: 'Completed' }
                ]
              }
            },
            { name: 'Start Date', type: 'date' },
            { name: 'End Date', type: 'date' },
            { name: 'Description', type: 'multilineText' },
            { name: 'Project ID', type: 'singleLineText' }
          ]
        },
        {
          name: 'Tasks',
          description: 'Task tracking',
          fields: [
            { name: 'Title', type: 'singleLineText' },
            {
              name: 'Status',
              type: 'singleSelect',
              options: {
                choices: [
                  { name: 'Backlog' },
                  { name: 'Todo' },
                  { name: 'In Progress' },
                  { name: 'Review' },
                  { name: 'Done' }
                ]
              }
            },
            {
              name: 'Priority',
              type: 'singleSelect',
              options: {
                choices: [
                  { name: 'Low' },
                  { name: 'Medium' },
                  { name: 'High' }
                ]
              }
            },
            { name: 'Assigned To', type: 'singleLineText' },
            { name: 'Due Date', type: 'date' },
            { name: 'Description', type: 'multilineText' },
            { name: 'Dependencies', type: 'multipleSelects' },
            { name: 'Estimated Hours', type: 'number' },
            { name: 'Sprint', type: 'singleLineText' }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    console.error('Failed to create Airtable base:', await response.text());
    throw new Error('Failed to create Airtable base');
  }

  const data = await response.json();
  console.log('Airtable base created successfully:', data);
  return data.id;
}

serve(async (req) => {
  console.log('Airtable sync function called')

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { operation, data } = await req.json()
    console.log(`Operation: ${operation}`)

    switch (operation) {
      case 'create_base':
        const baseId = await createAirtableBase();
        return new Response(
          JSON.stringify({ baseId }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'sync':
        const response = await fetch(`${AIRTABLE_BASE_URL}/${data.baseId}/Tasks`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Airtable API error: ${response.statusText}`);
        }

        const airtableData = await response.json();
        console.log('Airtable data fetched successfully');

        return new Response(
          JSON.stringify({ data: airtableData }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'update':
        const updateResponse = await fetch(`${AIRTABLE_BASE_URL}/${data.baseId}/Tasks`, {
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
        });

        if (!updateResponse.ok) {
          throw new Error(`Airtable API error: ${updateResponse.statusText}`);
        }

        console.log('Airtable record updated successfully');
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

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
