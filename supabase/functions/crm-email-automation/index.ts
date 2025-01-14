import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

const handler = async (req: Request): Promise<Response> => {
  console.log("[CRM Automation] Function triggered");

  if (req.method === "OPTIONS") {
    console.log("[CRM Automation] Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactData = await req.json();
    console.log("[CRM Automation] Received contact data:", contactData);

    // 1. Create contact funnel entry
    console.log("[CRM Automation] Creating contact funnel entry...");
    const { data: funnelData, error: funnelError } = await supabase
      .from("contact_funnel")
      .insert({
        contact_submission_id: contactData.id,
        current_stage: "inquiry",
        status: "new",
      })
      .select()
      .single();

    if (funnelError) {
      console.error("[CRM Automation] Error creating funnel entry:", funnelError);
      throw funnelError;
    }

    console.log("[CRM Automation] Contact funnel entry created:", funnelData);

    // 2. Get welcome email template
    console.log("[CRM Automation] Fetching welcome email template...");
    const { data: templateData, error: templateError } = await supabase
      .from("email_templates")
      .select("*")
      .eq("trigger_event", "welcome_email")
      .single();

    if (templateError) {
      console.error("[CRM Automation] Error fetching email template:", templateError);
      throw templateError;
    }

    console.log("[CRM Automation] Email template found:", templateData);

    // 3. Send welcome email via Resend
    if (!RESEND_API_KEY) {
      const error = new Error("RESEND_API_KEY is not configured");
      console.error("[CRM Automation]", error);
      throw error;
    }

    console.log("[CRM Automation] Sending welcome email...");
    const emailHtml = templateData.body
      .replace("{{name}}", contactData.name)
      .replace("{{projectType}}", contactData.project_type);

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MakeITHappen Support <support@makeitappen.ai>",
        to: [contactData.email],
        subject: templateData.subject,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.text();
      console.error("[CRM Automation] Resend API error:", error);
      throw new Error(`Failed to send welcome email: ${error}`);
    }

    console.log("[CRM Automation] Welcome email sent successfully");

    // 4. Record the email communication
    console.log("[CRM Automation] Recording email communication...");
    const { error: communicationError } = await supabase
      .from("email_communications")
      .insert({
        contact_funnel_id: funnelData.id,
        template_id: templateData.id,
        status: "sent",
        email_data: {
          recipient: contactData.email,
          subject: templateData.subject,
        },
      });

    if (communicationError) {
      console.error("[CRM Automation] Error recording email communication:", communicationError);
      throw communicationError;
    }

    console.log("[CRM Automation] Email communication recorded successfully");

    // 5. Send admin notification
    console.log("[CRM Automation] Sending admin notification...");
    const adminEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
      <p><strong>Project Type:</strong> ${contactData.project_type}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message}</p>
    `;

    const adminNotification = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MakeITHappen Support <support@makeitappen.ai>",
        to: ["belchonen18@gmail.com"],
        subject: `New Contact: ${contactData.name} - ${contactData.project_type}`,
        html: adminEmailHtml,
      }),
    });

    if (!adminNotification.ok) {
      const error = await adminNotification.text();
      console.error("[CRM Automation] Admin notification error:", error);
      throw new Error(`Failed to send admin notification: ${error}`);
    }

    console.log("[CRM Automation] Admin notification sent successfully");
    console.log("[CRM Automation] Process completed successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact processed successfully" 
      }), 
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("[CRM Automation] Error in CRM automation:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
};

serve(handler);