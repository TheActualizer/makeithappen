import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConsultationRequest {
  name: string;
  email: string;
  consultationDate: string;
  consultationTime: string;
  projectType: string;
  description: string;
  zoomLink: string;
  eventUri: string;
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
        from: "MakeITHappen Support <support@makeitappen.ai>",
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
        from: "MakeITHappen Support <support@makeitappen.ai>",
        to: ["belchonen18@gmail.com"],
        subject: `New Consultation Request from ${consultation.name}`,
        html: adminEmailHtml,
      }),
    });

    if (!customerRes.ok || !adminRes.ok) {
      const error = await customerRes.text();
      console.error("Resend API error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send emails" }), 
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Emails sent successfully");
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