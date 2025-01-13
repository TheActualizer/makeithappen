import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const AIRTABLE_API_KEY = Deno.env.get('AIRTABLE_API_KEY');
const WORKSPACE_ID = 'wspcDZXKfTU8R1zWW';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { operation, data } = await req.json();
    console.log('Received request:', { operation, data });

    if (!AIRTABLE_API_KEY) {
      throw new Error('Airtable API key not configured');
    }

    if (operation === 'create_base') {
      const response = await fetch(`https://api.airtable.com/v0/meta/bases`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Project Progress Tracking',
          workspaceId: WORKSPACE_ID,
          tables: [
            {
              name: 'Milestones',
              description: 'Track project milestones',
              fields: [
                { name: 'Name', type: 'singleLineText' },
                { 
                  name: 'Status',
                  type: 'singleSelect',
                  options: { choices: [
                    { name: 'Not Started' },
                    { name: 'In Progress' },
                    { name: 'Completed' }
                  ]}
                },
                { name: 'Due Date', type: 'date' },
                { name: 'Description', type: 'multilineText' },
                { name: 'Next Steps', type: 'multilineText' },
                { name: 'Project ID', type: 'singleLineText' }
              ]
            },
            {
              name: 'Sprints',
              description: 'Track project sprints',
              fields: [
                { name: 'Name', type: 'singleLineText' },
                {
                  name: 'Status',
                  type: 'singleSelect',
                  options: { choices: [
                    { name: 'Planned' },
                    { name: 'Active' },
                    { name: 'Completed' }
                  ]}
                },
                { name: 'Start Date', type: 'date' },
                { name: 'End Date', type: 'date' },
                { name: 'Description', type: 'multilineText' },
                { name: 'Project ID', type: 'singleLineText' }
              ]
            },
            {
              name: 'Tasks',
              description: 'Track project tasks',
              fields: [
                { name: 'Title', type: 'singleLineText' },
                {
                  name: 'Status',
                  type: 'singleSelect',
                  options: { choices: [
                    { name: 'Backlog' },
                    { name: 'Todo' },
                    { name: 'In Progress' },
                    { name: 'Review' },
                    { name: 'Done' }
                  ]}
                },
                {
                  name: 'Priority',
                  type: 'singleSelect',
                  options: { choices: [
                    { name: 'Low' },
                    { name: 'Medium' },
                    { name: 'High' }
                  ]}
                },
                { name: 'Assigned To', type: 'singleLineText' },
                { name: 'Due Date', type: 'date' },
                { name: 'Description', type: 'multilineText' },
                { name: 'Sprint', type: 'singleLineText' },
                { name: 'Dependencies', type: 'multipleSelects' },
                { name: 'Estimated Hours', type: 'number' }
              ]
            }
          ]
        })
      });

      const result = await response.json();
      console.log('Airtable base created:', result);

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (operation === 'sync') {
      const { projectId } = data;
      if (!projectId) {
        throw new Error('Project ID is required for sync operation');
      }

      // Fetch data from Supabase
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      const [milestonesData, sprintsData, tasksData] = await Promise.all([
        supabase.from('milestones').select('*').eq('project_id', projectId),
        supabase.from('sprints').select('*').eq('project_id', projectId),
        supabase.from('tasks').select('*').eq('project_id', projectId)
      ]);

      // Sync with Airtable
      const baseId = Deno.env.get('AIRTABLE_BASE_ID');
      const syncPromises = [];

      if (milestonesData.data) {
        const milestoneSync = fetch(`https://api.airtable.com/v0/${baseId}/Milestones`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            records: milestonesData.data.map(milestone => ({
              id: milestone.id,
              fields: {
                Name: milestone.title,
                Status: milestone.status,
                'Due Date': milestone.due_date,
                Description: milestone.description,
                'Next Steps': milestone.next_steps?.join('\n'),
                'Project ID': projectId
              }
            }))
          })
        });
        syncPromises.push(milestoneSync);
      }

      if (sprintsData.data) {
        const sprintSync = fetch(`https://api.airtable.com/v0/${baseId}/Sprints`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            records: sprintsData.data.map(sprint => ({
              id: sprint.id,
              fields: {
                Name: sprint.title,
                Status: sprint.status,
                'Start Date': sprint.start_date,
                'End Date': sprint.end_date,
                Description: sprint.description,
                'Project ID': projectId
              }
            }))
          })
        });
        syncPromises.push(sprintSync);
      }

      if (tasksData.data) {
        const taskSync = fetch(`https://api.airtable.com/v0/${baseId}/Tasks`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            records: tasksData.data.map(task => ({
              id: task.id,
              fields: {
                Title: task.title,
                Status: task.status,
                Priority: task.priority,
                'Assigned To': task.assigned_to,
                'Due Date': task.due_date,
                Description: task.description,
                Sprint: task.sprint_id,
                Dependencies: task.dependencies,
                'Estimated Hours': task.estimated_hours
              }
            }))
          })
        });
        syncPromises.push(taskSync);
      }

      await Promise.all(syncPromises);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (operation === 'update') {
      const { recordId, fields } = data;
      if (!recordId || !fields) {
        throw new Error('Record ID and fields are required for update operation');
      }

      const baseId = Deno.env.get('AIRTABLE_BASE_ID');
      const response = await fetch(`https://api.airtable.com/v0/${baseId}/Tasks/${recordId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields })
      });

      const result = await response.json();
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid operation' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});