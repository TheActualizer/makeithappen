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
  console.log("========== CONSULTATION EMAIL FUNCTION START ==========");
  console.log("Request method:", req.method);
  console.log("Request headers:", Object.fromEntries(req.headers.entries()));

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("RESEND_API_KEY is not configured");
    }

    console.log("\n========== PARSING REQUEST BODY ==========");
    const consultation: ConsultationRequest = await req.json();
    console.log("Parsed consultation data:", consultation);

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

    console.log("\n========== SENDING CUSTOMER EMAIL ==========");
    console.log("Customer email template:", customerEmailHtml);
    
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

    console.log("Customer email response status:", customerRes.status);
    console.log("Customer email response headers:", Object.fromEntries(customerRes.headers.entries()));
    const customerEmailData = await customerRes.json();
    console.log("Customer email response data:", customerEmailData);

    console.log("\n========== SENDING ADMIN EMAIL ==========");
    console.log("Admin email template:", adminEmailHtml);
    
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

    console.log("Admin email response status:", adminRes.status);
    console.log("Admin email response headers:", Object.fromEntries(adminRes.headers.entries()));
    const adminEmailData = await adminRes.json();
    console.log("Admin email response data:", adminEmailData);

    if (!customerRes.ok || !adminRes.ok) {
      const error = await customerRes.text();
      console.error("Resend API error:", error);
      throw new Error(`Failed to send emails: ${error}`);
    }

    console.log("\n========== EMAIL SENDING COMPLETED ==========");
    console.log("Both emails sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }), 
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error: any) {
    console.error("\n========== ERROR IN CONSULTATION EMAIL FUNCTION ==========");
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } finally {
    console.log("========== CONSULTATION EMAIL FUNCTION END ==========\n");
  }
};

serve(handler);