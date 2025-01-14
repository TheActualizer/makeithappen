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

// Validate environment variables
const validateEnvironment = () => {
  const required = ["RESEND_API_KEY", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];
  const missing = required.filter(key => !Deno.env.get(key));
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
};

// Validate input data
const validateInput = (data: any) => {
  const required = ["name", "email", "projectType", "message", "id"];
  const missing = required.filter(key => !data[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }
};

const handler = async (req: Request): Promise<Response> => {
  console.log("[CRM Automation] Function triggered");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("[CRM Automation] Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate environment first
    console.log("[CRM Automation] Validating environment variables");
    validateEnvironment();

    const contactData = await req.json();
    console.log("[CRM Automation] Received contact data:", contactData);

    // Validate input data
    console.log("[CRM Automation] Validating input data");
    validateInput(contactData);

    // 1. Create contact funnel entry with retry
    console.log("[CRM Automation] Creating contact funnel entry...");
    let funnelData;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        const { data, error } = await supabase
          .from("contact_funnel")
          .insert({
            contact_submission_id: contactData.id,
            current_stage: "inquiry",
            status: "new",
          })
          .select()
          .single();

        if (error) {
          console.error(`[CRM Automation] Attempt ${retryCount + 1} failed:`, error);
          retryCount++;
          if (retryCount === maxRetries) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          continue;
        }

        funnelData = data;
        break;
      } catch (error) {
        console.error(`[CRM Automation] Database error on attempt ${retryCount + 1}:`, error);
        retryCount++;
        if (retryCount === maxRetries) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      }
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

    // 3. Send welcome email via Resend with retry
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    console.log("[CRM Automation] Sending welcome email...");
    const emailHtml = templateData.body
      .replace("{{name}}", contactData.name)
      .replace("{{projectType}}", contactData.project_type);

    retryCount = 0;
    let emailResponse;

    while (retryCount < maxRetries) {
      try {
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
          const errorText = await resendResponse.text();
          console.error(`[CRM Automation] Resend API error on attempt ${retryCount + 1}:`, errorText);
          retryCount++;
          if (retryCount === maxRetries) throw new Error(errorText);
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          continue;
        }

        emailResponse = await resendResponse.json();
        break;
      } catch (error) {
        console.error(`[CRM Automation] Email sending error on attempt ${retryCount + 1}:`, error);
        retryCount++;
        if (retryCount === maxRetries) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      }
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
          resend_response: emailResponse
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
      // Don't throw here, we still want to return success for the main flow
      console.log("[CRM Automation] Admin notification failed but main flow succeeded");
    } else {
      console.log("[CRM Automation] Admin notification sent successfully");
    }

    console.log("[CRM Automation] Process completed successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact processed successfully",
        data: {
          funnel_id: funnelData.id,
          email_status: "sent"
        }
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
        error: error.message,
        details: {
          name: error.name,
          stack: error.stack
        }
      }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
};

serve(handler);