import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConsultationRequest {
  name: string;
  email: string;
  consultationDate: string;
  consultationTime: string;
  projectType: string;
  description: string;
  zoomLink: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Handling consultation email request");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const consultation: ConsultationRequest = await req.json();
    console.log("Received consultation data:", consultation);

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Store appointment in database
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(
        SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY
      );

      const { error: dbError } = await supabase
        .from('appointments')
        .insert({
          name: consultation.name,
          email: consultation.email,
          consultation_date: consultation.consultationDate,
          consultation_time: consultation.consultationTime,
          project_type: consultation.projectType,
          status: 'scheduled'
        });

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error(`Failed to store appointment: ${dbError.message}`);
      }
    }

    // Email template for customer
    const customerEmailHtml = `
      <h2>Your Consultation is Confirmed!</h2>
      <p>Hello ${consultation.name},</p>
      <p>Your consultation has been scheduled for ${consultation.consultationDate} at ${consultation.consultationTime}.</p>
      
      <h3>Meeting Details:</h3>
      <p><strong>Zoom Link:</strong> <a href="${consultation.zoomLink}">${consultation.zoomLink}</a></p>
      <p>Please click the link above at the scheduled time to join the meeting.</p>
      
      <h3>Project Details:</h3>
      <p><strong>Type:</strong> ${consultation.projectType}</p>
      <p><strong>Description:</strong> ${consultation.description}</p>
      
      <p>If you need to reschedule or have any questions, please don't hesitate to reach out.</p>
      <p>We look forward to speaking with you!</p>
      
      <p>Best regards,<br>The Team</p>
    `;

    // Email template for admin
    const adminEmailHtml = `
      <h2>New Consultation Scheduled</h2>
      <h3>Client Information:</h3>
      <p><strong>Name:</strong> ${consultation.name}</p>
      <p><strong>Email:</strong> ${consultation.email}</p>
      <p><strong>Date:</strong> ${consultation.consultationDate}</p>
      <p><strong>Time:</strong> ${consultation.consultationTime}</p>
      
      <h3>Meeting Details:</h3>
      <p><strong>Zoom Link:</strong> <a href="${consultation.zoomLink}">${consultation.zoomLink}</a></p>
      
      <h3>Project Details:</h3>
      <p><strong>Type:</strong> ${consultation.projectType}</p>
      <p><strong>Description:</strong> ${consultation.description}</p>
    `;

    // Send email to customer
    const customerRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Lovable <onboarding@resend.dev>",
        to: [consultation.email],
        subject: "Your Consultation Confirmation",
        html: customerEmailHtml,
      }),
    });

    // Send copy to admin
    const adminRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Lovable <onboarding@resend.dev>",
        to: ["belchonen18@gmail.com"],
        subject: `New Consultation Request from ${consultation.name}`,
        html: adminEmailHtml,
      }),
    });

    if (!customerRes.ok || !adminRes.ok) {
      const error = await customerRes.text();
      console.error("Resend API error:", error);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Appointment scheduled but email notification failed" 
        }), 
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await customerRes.json();
    console.log("Emails sent successfully:", data);

    return new Response(
      JSON.stringify({ success: true }), 
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-consultation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);