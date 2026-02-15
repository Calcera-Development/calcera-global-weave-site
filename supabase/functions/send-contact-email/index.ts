import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

const handler = async (req: Request): Promise<Response> => {
  console.log(`Email function invoked: ${req.method}`);
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not set.");
    return new Response(
      JSON.stringify({ error: "Email service is not configured. Please set RESEND_API_KEY." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const body = await req.json();
    const { name, contact, email, message } = body;

    if (!name || !contact || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, contact, email, and message are all required." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // 1. Send Email to Team
    const teamEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Calcera Website <hello@calcera.global>",
        to: ["hello@calcera.global"],
        subject: `[Internal] New Consultation Request: ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 12px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin: 0; font-size: 24px;">New Inquiry Received</h1>
              <p style="color: #6b7280; margin-top: 5px;">A new request has been submitted via the website.</p>
            </div>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="font-size: 16px; color: #334155; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Inquiry Details</h2>
              <p style="margin: 10px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p style="margin: 10px 0;"><strong>Contact:</strong> ${escapeHtml(contact)}</p>
              <p style="margin: 15px 0 5px 0;"><strong>Message:</strong></p>
              <div style="background: #ffffff; padding: 15px; border: 1px solid #e2e8f0; border-radius: 6px; white-space: pre-wrap; color: #475569;">${escapeHtml(message)}</div>
            </div>
            
            <div style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 20px;">
              <p>Sent from Calcera Global Website</p>
            </div>
          </div>
        `,
      }),
    });

    // 2. Send Confirmation Email to Customer
    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Calcera Global <hello@calcera.global>",
        to: [email],
        subject: "We've Received Your Inquiry - Calcera Global",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333; line-height: 1.6;">
            <div style="text-align: center; margin-bottom: 40px;">
               <h1 style="color: #2563eb; margin: 0; font-size: 28px; letter-spacing: -0.025em;">Calcera Global</h1>
               <div style="height: 4px; width: 40px; background: #2563eb; margin: 20px auto 0;"></div>
            </div>

            <p style="font-size: 18px; margin-bottom: 20px;">Hello ${escapeHtml(name)},</p>
            
            <p style="margin-bottom: 25px;">
              Thank you for reaching out to **Calcera Global**. We've successfully received your inquiry regarding your project idea.
            </p>

            <div style="background-color: #f0f7ff; border-left: 4px solid #2563eb; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; color: #1e40af; font-weight: 500;">
                Our team is currently reviewing your details. We strive to respond to all consultation requests within 24-48 business hours.
              </p>
            </div>

            <p style="margin-bottom: 10px;">While you wait, feel free to:</p>
            <ul style="margin-bottom: 30px; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Explore our [portfolio](https://calcera.global#work)</li>
              <li style="margin-bottom: 8px;">Check out our [services](https://calcera.global#services)</li>
            </ul>

            <p style="margin-bottom: 40px;">
              We look forward to the possibility of collaborating with you.
            </p>

            <div style="border-top: 1px solid #eee; padding-top: 30px; margin-top: 40px; text-align: center;">
              <p style="margin: 0; font-weight: bold; color: #1e293b;">The Calcera Global Team</p>
              <p style="margin: 5px 0 0; font-size: 14px; color: #64748b;">Building the future, together.</p>
              
              <div style="margin-top: 25px;">
                <a href="https://calcera.global" style="color: #2563eb; text-decoration: none; font-size: 14px; margin: 0 10px;">Website</a>
                <span style="color: #cbd5e1;">&bull;</span>
                <a href="mailto:hello@calcera.global" style="color: #2563eb; text-decoration: none; font-size: 14px; margin: 0 10px;">Contact Us</a>
              </div>
            </div>
          </div>
        `,
      }),
    });

    const teamResult = await teamEmailResponse.json();
    const customerResult = await customerEmailResponse.json();

    if (!teamEmailResponse.ok || !customerEmailResponse.ok) {
      console.error("Resend API error:", { teamResult, customerResult });
      return new Response(
        JSON.stringify({
          error: "Failed to send one or more emails.",
          team: teamResult.message,
          customer: customerResult.message
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, teamId: teamResult.id, customerId: customerResult.id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Unhandled error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
